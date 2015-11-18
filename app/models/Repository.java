package models;

public class Repository extends GlobalObject {

	 	private String description, homepage, name, full_name;
	    private String html_url;    // this is the UI
	    private String git_url;
	    private User owner;   // not fully populated. beware.
	    
	    
	    /*
		 * methods :
		 * methods extends from GlobalObject +
		 * getCollaborators()
		 * getCollaboratorNames()
		 * 
		 * 
		 */
	    
	    
		public String getDescription() {
			return description;
		}
		public void setDescription(String description) {
			this.description = description;
		}
		public String getHomepage() {
			return homepage;
		}
		public void setHomepage(String homepage) {
			this.homepage = homepage;
		}
		public String getName() {
			return name;
		}
		public void setName(String name) {
			this.name = name;
		}
		public String getFull_name() {
			return full_name;
		}
		public void setFull_name(String full_name) {
			this.full_name = full_name;
		}
		public String getHtml_url() {
			return html_url;
		}
		public void setHtml_url(String html_url) {
			this.html_url = html_url;
		}
		public String getGit_url() {
			return git_url;
		}
		public void setGit_url(String git_url) {
			this.git_url = git_url;
		}
		public User getOwner() {
			return owner;
		}
		public void setOwner(User owner) {
			this.owner = owner;
		}
	
	    
	
}
