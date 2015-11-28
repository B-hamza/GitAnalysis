package ServiceApi;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;

import models.GlobalResults;
import models.Repository;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import play.Logger;
import play.libs.F.Promise;
import play.libs.ws.WSClient;
import play.libs.ws.WSResponse;

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

	public JsonNode getElementsJson() throws MalformedURLException, IOException {

		Logger.debug("Jsoncall of the searchUtils getElemntsJson ...");
		JsonNode repo = this.getElemntsGeneric(JsonNode.class);
		return repo;

	}
	
	public GlobalResults<Repository> getElements() throws MalformedURLException, IOException {

		Logger.debug("ObjectsRepo call of the searchUtils ...");
		GlobalResults<Repository> repo = this.getElemntsGeneric(GlobalResults.class);
		return repo;

	}
	
	public<T> T getElemntsGeneric(Class<T> genericClass) throws MalformedURLException, IOException{
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
//	public JsonNode getElementsJson() throws MalformedURLException, IOException{
//		return Json.parse(this.getElementsResult().toString());
//	}
	
//	public GlobalResults<Repository> getElements(){
//		ObjectMapper objMapper = new ObjectMapper();
//		objMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
//		GlobalResults<Repository> repo = objMapper.readValue(this.getElementsJson()., GlobalResults.class);
//	}
	
	@Inject WSClient ws;
	public Promise<WSResponse> getElementsPromise(){
		Promise<WSResponse> promise = ws.url("https://api.github.com/search/repositories?q=tetris+language:assembly&sort=stars&order=desc").get();
		return promise;
	}

}
