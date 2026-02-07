package com.ConstructionEdge.dto;

import com.ConstructionEdge.entity.TaskStatus;
import java.time.LocalDate;
import java.util.Set;

public class TaskRequestDTO {

    private String title;
    private String description;

    private Long projectId;

    // ✅ ENUM — matches Task entity
    private TaskStatus status;

    private String priority;
    private LocalDate dueDate;

    // ✅ Using Set (no duplicate employees)
    private Set<Long> employeeIds;

    // ===== Getters & Setters =====

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

    public TaskStatus getStatus() {
        return status;
    }
 
    public void setStatus(TaskStatus status) {
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

    public Set<Long> getEmployeeIds() {
        return employeeIds;
    }
 
    public void setEmployeeIds(Set<Long> employeeIds) {
        this.employeeIds = employeeIds;
    }
}
