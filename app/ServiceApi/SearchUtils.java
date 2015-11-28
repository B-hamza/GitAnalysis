package ServiceApi;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;

import models.GlobalResults;
import models.Repository;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import play.Logger;
import play.libs.F.Promise;
import play.libs.ws.WSClient;
import play.libs.ws.WSResponse;

/**
 * @author hamza
 *
 */
public abstract class SearchUtils {

	final String url;
	List<String> params = new ArrayList<String>();

	public SearchUtils(String path) {
		this.url = GitApi.GITAPI_URL + path;

	}

	public SearchUtils(GitApi api, String path) {
		api.globalUrl = api.GITAPI_URL + path;
		this.url = api.globalUrl;
	}

	public SearchUtils q(String name) {
		params.add(name);
		return this;
	}

	
	/**
	 * getElementsJson fait appel à getElementsGeneric avec comme paramétre la class JsonNode pour créer un résultat de type JsonNode
	 * @return JsonNode 
	 * @throws MalformedURLException
	 * @throws IOException
	 */
	public JsonNode getElementsJson() throws MalformedURLException, IOException {

		Logger.debug("Jsoncall of the searchUtils getElemntsJson ...");
		JsonNode repo = this.getElemntsGeneric(new TypeReference<JsonNode>() {});
		return repo;

	}

	
	/**
	 * getElements fait appel à getElementsGeneric avec comme paramétre la class GlobalResults<Repository> pour créer un résultat de type GlobalResult<Repository> (liste de répertoire)
	 * @return GlobalResults<Rpository> GlobalResults est un resultat générique de la recherche vu que 
	 * 			sur l'api git fourni par github le resultat de search et tjr le même (user, repository...)
	 * @throws MalformedURLException
	 * @throws IOException
	 */
	public GlobalResults<Repository> getElements() throws MalformedURLException, IOException {

		Logger.debug("ObjectsRepo call of the searchUtils ...");
		GlobalResults<Repository> repo = this.getElemntsGeneric(new TypeReference<GlobalResults<Repository>>() {});
		return repo;

	}
	
	
	
	/**
	 * getElemntsGeneric est la méthode responsable d'apporter les résultat de l'api github en utulisant HttpUrlConnection enfin s'appuyant sur Jackson-core2.(x>2)
	 * aufait, l'utilisation du TypeReference revient au problème d'utiliser un appel générique du mapper avec la class GlobalResults<Rpository>
	 * et puis nous résoud le problème de l'unchecked conversion 
	 * @param genericClass de type TypeReference<T>
	 * @return Classe générique 
	 * @throws MalformedURLException
	 * @throws IOException
	 */
	public<T> T getElemntsGeneric(TypeReference<T> genericClass) throws MalformedURLException, IOException{
		T repo ;
		try {
			Logger.debug("Genericcall of the searchUtils getElemntsGeneric ...");
			String appendParam = "";
			if (!params.isEmpty()) {
				appendParam = "?" + params.get(0);
				for (int i = 1; i < params.size(); i++)
					appendParam += "&" + params.get(i);
			}

			URL url = new URL(this.url + appendParam);
			Logger.debug("Url for connection : " + this.url + appendParam);

			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setRequestMethod("GET");
			conn.setRequestProperty("Accept", "application/json");

			if (conn.getResponseCode() != 200) {
				throw new RuntimeException("Failed : HTTP error code : "
						+ conn.getResponseCode());
			}
			ObjectMapper objMapper = new ObjectMapper();
			objMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
			repo = objMapper.readValue(conn.getInputStream(), genericClass);

			conn.disconnect();

		} catch (MalformedURLException e) {
			Logger.error(e.getMessage(),e);
			throw new MalformedURLException();

		} catch (IOException e) {
			Logger.error(e.getMessage(),e);
			throw new IOException();
		}
		return repo;
	}
	
	/**
	 * l'utilisation d'appels asynchrone !!! Non encore tester
	 * @return promise response
	 */
	@Inject WSClient ws;
	public Promise<WSResponse> getElementsPromise(){
		String appendParam = "";
		if (!params.isEmpty()) {
			appendParam = "?" + params.get(0);
			for (int i = 1; i < params.size(); i++)
				appendParam += "&" + params.get(i);
		}
		Promise<WSResponse> promise = ws.url(this.url + appendParam).get();
		return promise;
	}

}
