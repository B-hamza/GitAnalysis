package test.serviceApi;

import java.io.IOException;
import java.net.MalformedURLException;

import models.GlobalResults;
import models.Repository;

import org.junit.Before;
import org.junit.Test;

import ServiceApi.GitApi;
import ServiceApi.SearchRepositories;
import static org.junit.Assert.*;

public class SearchUtilsTest {
	
	SearchRepositories searchRepo ;
	
	@Before
	public void setUp(){
		GitApi gitApi = GitApi.prepareConnection();
    	searchRepo = gitApi.searchRepositories();
    	searchRepo = searchRepo.q("tetris");
	}
	
	@Test
	public void getElements(){
		
    	try {
			GlobalResults<Repository> repos = searchRepo.getElements();
			assertEquals(6829, repos.getTotal_count());
			assertEquals(30, repos.getItems().size());
			System.out.println(repos.getItems().get(0));
			System.out.println(repos.getItems().get(0).getOwner());
    	} catch (MalformedURLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}

}
