package ServiceApi;

import java.util.List;

import play.Logger;

public class SearchRepositories extends SearchUtils {

	static final String pathSearch = "/search/repositories";
	static final String pathRepo= "/repositories";
	
	public SearchRepositories(GitApi api, String pathrepo) {
		super(api, pathSearch);
	}
	
	public SearchRepositories(String pathrepo) {
		super(pathrepo);
	}
	
	public SearchRepositories q(String param){
		super.param("q="+param);
		return this;
	}
	
	public SearchRepositories page(int numberPage){
		super.param("page="+numberPage);
		return this;
	}
	
	public SearchRepositories PerPage(int numberPage){
		super.param("per_page="+numberPage);
		return this;
	}
	
	public SearchRepositories getRepositoryCommitsById(String id){
		String PathCommits = pathRepo+"/"+id+"/commits";
		return new SearchRepositories(PathCommits);
	}
	
	
}
