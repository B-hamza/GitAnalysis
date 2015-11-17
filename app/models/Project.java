package models;

public class Project {

	private String id;
	private String projectName;
	
	public Project(String id, String name){
		this.id = id;
		this.projectName = name;
	}
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getProjectName() {
		return projectName;
	}
	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}
	
}
