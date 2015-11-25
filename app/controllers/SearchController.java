package controllers;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.MalformedURLException;
import java.net.URLEncoder;


import ServiceApi.GitApi;
import ServiceApi.SearchRepositories;

import com.fasterxml.jackson.databind.JsonNode;

import play.Logger;
import play.libs.F.Promise;
import play.mvc.*;
import views.html.*;

public class SearchController extends Controller {

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
    
    
    public static Promise<Result> searchUsingPromise(String term){
    	Logger.debug("call the service search ");
    	GitApi gitApi = GitApi.prepareConnection();
    	SearchRepositories searchRepo = gitApi.searchRepositories();
    	Promise<Result> jsonPromise = searchRepo.getRepositoryCommitsById(term).page(1).PerPage(100)
    			.getElementsPromise()
    			.map(response -> {
    	    return ok(response.asJson());
    			});
    	return jsonPromise;

    }
    
    
    
}
