package ServiceApi;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.databind.JsonNode;

import play.Logger;
import play.libs.Json;
import play.mvc.Result;

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
		Logger.debug("q is " + name + " and url is " + this.url);
		params.add(name);
		return this;
	}

	public JsonNode getElements() {

		String result = "";
		try {
			Logger.debug("call of the searchUtils getElements ...");
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

			BufferedReader br = new BufferedReader(new InputStreamReader(
					(conn.getInputStream())));

			String output;

			while ((output = br.readLine()) != null) {
				result += output;
			}

			conn.disconnect();

		} catch (MalformedURLException e) {

			e.printStackTrace();

		} catch (IOException e) {

			e.printStackTrace();

		}
		return Json.parse(result);

	}

}