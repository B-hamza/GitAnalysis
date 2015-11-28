package models;

public class User extends GlobalObject{

	private String avatarUrl;
	private String gravatUrl;
	private String blog;
	private String htmlUrl;
	private String location;
	private String name;
	private String login;
	
	
	/*
	 * methods :
	 * methods extends from GlobalObject +
	 * getAvatarUrl()
	 * getBlog()
	 * getHtmlUrl()
	 * getLocation()
	 * getName()
	 * getLogin()
	 * getRepositories() // principalement les répértoire publique de l'utilisateurs
	 * 
	 */
	
	
	public String getAvatarUrl() {
		return avatarUrl;
	}
	public void setAvatarUrl(String avatarUrl) {
		this.avatarUrl = avatarUrl;
	}
	public String getGravatUrl() {
		return gravatUrl;
	}
	public void setGravatUrl(String gravatUrl) {
		this.gravatUrl = gravatUrl;
	}
	public String getBlog() {
		return blog;
	}
	public void setBlog(String blog) {
		this.blog = blog;
	}
	public String getHtmlUrl() {
		return htmlUrl;
	}
	public void setHtmlUrl(String htmlUrl) {
		this.htmlUrl = htmlUrl;
	}
	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getLogin() {
		return login;
	}
	public void setLogin(String login) {
		this.login = login;
	}

	
}
