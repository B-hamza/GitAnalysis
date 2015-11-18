package ServiceApi;

import java.net.HttpURLConnection;

public class GitApi {
	
	static final String GITAPI_URL = "https://api.github.com";
	String token;
	private HttpURLConnection httpconnection;
	static String globalUrl;
	
	public GitApi(String urltoConstruct, String token) {
		this.token = token;
	}
	
	public static GitApi prepareConnection(){
		return new GitApi(GITAPI_URL,null);
	}
	
	public static GitApi prepareConnectionWithTokens(String token){
		return new GitApi(GITAPI_URL, token);
	}
	
	public SearchRepositories searchRepositories(){
		return new SearchRepositories(this,null);
	}
	
}
