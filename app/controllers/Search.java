package controllers;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;

import com.fasterxml.jackson.databind.JsonNode;

import models.Project;
import play.Logger;
import play.libs.ws.*;
import play.libs.F.Promise;
import play.libs.Json;
import play.mvc.*;
import views.html.*;

public class Search extends Controller {

	@Inject WSClient ws;
	
    public Result index() {
        return ok(index.render("Your new application is ready."));
    }
    
    public Promise<Result> searchUsingPromise(String term){
    	Logger.debug("call the service search ");
    	Promise<Result> jsonPromise = ws.url("https://api.github.com/search/repositories?q=tetris+language:assembly&sort=stars&order=desc").get().map(response -> {
    	    return ok(response.asJson());
    	});
    	return jsonPromise;

//    	List<Project> projects = new ArrayList<Project>();
//    	Project project = new Project("project1", "this is the first project");
//    	projects.add(project);
//    	project = new Project("project2", "this is the second project");
//    	projects.add(project);
    }
    
    public Result searchUsingJxRS(String term){

    	String result = "";
  	  try {
  		Logger.debug("call the service search with JXRS");
  		
  		URL url = new URL("https://api.github.com/search/repositories?q="+term+"+language:assembly&sort=stars&order=desc");
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
  	
  	  	return ok(result);
    }
    
    
    
    
}
