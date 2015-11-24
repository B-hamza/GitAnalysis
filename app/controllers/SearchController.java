package controllers;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
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
			return badRequest();
		}
    }
    
    
    
    public Result getCommitsFromRepo(String idRepo){
    	GitApi gitApi = GitApi.prepareConnection();
    	SearchRepositories searchRepo = gitApi.searchRepositories();
    	JsonNode jsonListRepo = searchRepo.getRepositoryCommitsById(idRepo).page(1).PerPage(100).getElementsJson();
    	return ok(jsonListRepo);
    }
    
    
    public Promise<Result> searchUsingPromise(String term){
    	Logger.debug("call the service search ");
    	Promise<Result> jsonPromise = ws.url("https://api.github.com/search/repositories?q=tetris+language:assembly&sort=stars&order=desc").get().map(response -> {
    	    return ok(response.asJson());
    	});
    	return jsonPromise;

    }
    
    public Result SearchUsingThirdPartApi(String term){
    	
    	try {
			GitHub github = GitHub.connect();
			GHRepositorySearchBuilder repos = github.searchRepositories().q("tetris");
			int i = 0;
			//repos.list().forEach((repositoy) -> System.out.println("Content: "+(i+1)+ " "+ repositoy));

			for(GHRepository repo : repos.list()){
				System.out.println("content : "+i+" "+repo);
				i++;
			}
			
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    	
    	return ok ();
    }
    
    
    
}
