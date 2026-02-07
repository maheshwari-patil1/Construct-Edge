package com.ConstructionEdge.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.time.LocalDate;


@Entity
@Table(name = "employee")
@JsonIgnoreProperties({"password"})   // ✅ hide sensitive data
public class Employee {

    @Id
  
    private Long empId;

    private String userId;
    private String name;
    private String skill;
    private String jobRole;
    private int experienceYear;
    private String contactNumber;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;
    
    @ManyToOne
    @JoinColumn(name = "project_id")
    private Project project;


    public Project getProject() {
		return project;
	}

	public void setProject(Project project) {
		this.project = project;
	}

	// Many Employees → One Role
    @ManyToOne
    @JoinColumn(name = "role_id")
    @JsonIgnoreProperties({"employees"})   // ✅ prevent circular role mapping
    private Role role;
    
    @Column(name = "hire_date")
    private LocalDate hireDate;


    // ===== Getters & Setters =====

    public Long getEmpId() {
        return empId;
    }

    public void setEmpId(Long empId) {
        this.empId = empId;
    }

    public String getUserId() {
        return userId;
    }
 
    public void setUserId(String userId) {
        this.userId = userId;
    }
 
    public String getName() {
        return name;
    }
 
    public void setName(String name) {
        this.name = name;
    }
 
    public String getSkill() {
        return skill;
    }
 
    public void setSkill(String skill) {
        this.skill = skill;
    }
 
    public String getJobRole() {
        return jobRole;
    }
 
    public void setJobRole(String jobRole) {
        this.jobRole = jobRole;
    }
 
    public int getExperienceYear() {
        return experienceYear;
    }
 
    public void setExperienceYear(int experienceYear) {
        this.experienceYear = experienceYear;
    }
 
    public String getContactNumber() {
        return contactNumber;
    }
 
    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }
 
    public String getEmail() {
        return email;
    }
 
    public void setEmail(String email) {
        this.email = email;
    }
 
    public String getPassword() {
        return password;
    }
 
    public void setPassword(String password) {
        this.password = password;
    }
 
    public Role getRole() {
        return role;
    }
 
    public void setRole(Role role) {
        this.role = role;
    }
    
    public LocalDate getHireDate() {
        return hireDate;
    }

    public void setHireDate(LocalDate hireDate) {
        this.hireDate = hireDate;
    }

	

}
