package com.ConstructionEdge.dto;

import java.time.LocalDate;
import java.util.List;

public class TaskResponseDTO {

    private Long id;
    private String title;
    private String description;

    private Long projectId;
    private String projectName;

    private List<UserDTO> assignedUsers;

    private String status;
    private String priority;
    private LocalDate dueDate;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public Long getProjectId() {
		return projectId;
	}
	public void setProjectId(Long projectId) {
		this.projectId = projectId;
	}
	public String getProjectName() {
		return projectName;
	}
	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}
	public List<UserDTO> getAssignedUsers() {
		return assignedUsers;
	}
	public void setAssignedUsers(List<UserDTO> assignedUsers) {
		this.assignedUsers = assignedUsers;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getPriority() {
		return priority;
	}
	public void setPriority(String priority) {
		this.priority = priority;
	}
	public LocalDate getDueDate() {
		return dueDate;
	}
	public void setDueDate(LocalDate dueDate) {
		this.dueDate = dueDate;
	}

    // getters & setters
    
    
}
