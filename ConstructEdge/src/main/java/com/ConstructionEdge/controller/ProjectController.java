package com.ConstructionEdge.controller;

import java.util.List;
import java.util.Set;
import java.util.HashSet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.ConstructionEdge.entity.Project;
import com.ConstructionEdge.entity.Employee;
import com.ConstructionEdge.services.ProjectService;
import com.ConstructionEdge.repo.ProjectRepository;
import com.ConstructionEdge.repo.EmployeeRepository;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin("*")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @Autowired
    private ProjectRepository repo;

    @Autowired
    private EmployeeRepository employeeRepository;

    // ✅ CREATE PROJECT
    @PostMapping
    public Project save(@RequestBody Project project) {

        // ✅ Manager is REQUIRED
        if (project.getManager() == null) {
            throw new RuntimeException("Manager is required");
        }

        // ✅ Initialize employees ONLY if null
        if (project.getEmployees() == null) {
            project.setEmployees(new HashSet<>());
        }

        return projectService.save(project);
    }

    // ✅ GET ALL PROJECTS
    @GetMapping
    public List<Project> getAll() {
        return projectService.getAll();
    }

    // ✅ GET EMPLOYEES OF PROJECT
    @GetMapping("/{id}/employees")
    public Set<Employee> getProjectEmployees(@PathVariable Long id) {

        Project project = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        return project.getEmployees();
    }

    // ✅ ASSIGN / REPLACE EMPLOYEES OF PROJECT
    @PostMapping("/{id}/employees")
    public Project assignEmployeesToProject(
            @PathVariable Long id,
            @RequestBody List<Long> employeeIds
    ) {
        Project project = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        Set<Employee> employees =
                new HashSet<>(employeeRepository.findAllById(employeeIds));

        project.setEmployees(employees);
        return repo.save(project);
    }

    // ✅ UPDATE PROJECT
    @PutMapping("/{id}")
    public Project update(@PathVariable Long id, @RequestBody Project updated) {

        Project existing = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        existing.setProjectName(updated.getProjectName());
        existing.setBudget(updated.getBudget());
        existing.setStartDate(updated.getStartDate());
        existing.setEndDate(updated.getEndDate());
        existing.setLocation(updated.getLocation());
        existing.setStatus(updated.getStatus());
        existing.setProgress(updated.getProgress());

        // ✅ Manager update allowed (optional)
        if (updated.getManager() != null) {
            existing.setManager(updated.getManager());
        }

        return repo.save(existing);
    }

    @DeleteMapping("/{id}")
    public void deleteProject(@PathVariable Long id) {
        repo.deleteById(id);
    }
}
