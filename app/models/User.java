package models;

public class User extends GlobalObject{

	private String avatar_url;
	private String gravatar_url;
	private String blog;
	private String html_url;
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
		return avatar_url;
	}
	public void setAvatarUrl(String avatarUrl) {
		this.avatar_url = avatarUrl;
	}
	public String getGravatUrl() {
		return gravatar_url;
	}
	public void setGravatUrl(String gravatUrl) {
		this.gravatar_url = gravatUrl;
	}
	public String getBlog() {
		return blog;
	}
	public void setBlog(String blog) {
		this.blog = blog;
	}
	public String getHtmlUrl() {
		return html_url;
	}
	public void setHtmlUrl(String htmlUrl) {
		this.html_url = htmlUrl;
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
	
	@Override
	public String toString() {
		return "User [id=" +this.getId()+ "avatarUrl=" + avatar_url + ", gravatUrl=" + gravatar_url
				+ ", blog=" + blog + ", htmlUrl=" + html_url + ", location="
				+ location + ", name=" + name + ", login=" + login + "]";
	}

	
}
