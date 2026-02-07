package com.ConstructionEdge.dto;

public class AssignManagerRequest {

    private Long managerId;
    private String assignment;

    // ===== getters & setters =====

    public Long getManagerId() {
        return managerId;
    }

    public void setManagerId(Long managerId) {
        this.managerId = managerId;
    }

    public String getAssignment() {
        return assignment;
    }

    public void setAssignment(String assignment) {
        this.assignment = assignment;
    }
}
