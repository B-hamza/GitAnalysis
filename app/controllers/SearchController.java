package controllers;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.MalformedURLException;
import java.net.URLEncoder;

import javax.inject.Inject;

import org.kohsuke.github.GHRepository;
import org.kohsuke.github.GHRepositorySearchBuilder;
import org.kohsuke.github.GitHub;

import ServiceApi.GitApi;
import ServiceApi.SearchRepositories;

import com.fasterxml.jackson.databind.JsonNode;

import play.Logger;
import play.libs.ws.*;
import play.libs.F.Promise;
import play.mvc.*;
import views.html.*;

public class SearchController extends Controller {

	@Inject WSClient ws;
	
    public Result index() {
        return ok(main.render("Git Analyse"));
    }
    
    public Result SearchRepositoriesUsingInternApi(String name,int pageNumber){
    	
    	GitApi gitApi = GitApi.prepareConnection();
    	SearchRepositories searchRepo = gitApi.searchRepositories();
		try {
			JsonNode jsonListRepo;
			jsonListRepo = searchRepo.q(URLEncoder.encode(name,"UTF-8")).page(pageNumber).PerPage(100).getElementsJson();
			return ok(jsonListRepo.get("items"));
		} catch (UnsupportedEncodingException e) {
			return badRequest("Bad request, see input forma : "+name);
		} catch (MalformedURLException e) {
			return badRequest("Bad request, Error (400)");
		} catch (IOException e){
			return internalServerError("Failed to load Page, Internal Server Error (500)");
		}
    }
    
    
    
    public Result getCommitsFromRepo(String idRepo){
    	try{
	    	GitApi gitApi = GitApi.prepareConnection();
	    	SearchRepositories searchRepo = gitApi.searchRepositories();
	    	JsonNode jsonListRepo = searchRepo.getRepositoryCommitsById(idRepo).page(1).PerPage(100).getElementsJson();
	    	return ok(jsonListRepo);
    	}catch (UnsupportedEncodingException e) {
			return badRequest();
		} catch (MalformedURLException e) {
			return badRequest("Bad request Error (400)");
		} catch (IOException e){
			return internalServerError("Failed to load Page Internal Server Error (500)");
		}
    }
    
    
    public Promise<Result> searchUsingPromise(String term){
    	Logger.debug("call the service search ");
    	Promise<Result> jsonPromise = ws.url("https://api.github.com/search/repositories?q=tetris+language:assembly&sort=stars&order=desc").get().map(response -> {
    	    return ok(response.asJson());
    	});
    	return jsonPromise;

    }
    
    
    
}
