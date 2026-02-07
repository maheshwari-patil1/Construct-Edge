package com.ConstructionEdge.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ConstructionEdge.dto.AssignManagerRequest;
import com.ConstructionEdge.entity.Manager;
import com.ConstructionEdge.entity.Project;
import com.ConstructionEdge.entity.Task;
import com.ConstructionEdge.repo.ProjectRepository;
import com.ConstructionEdge.repo.TaskRepository;
import com.ConstructionEdge.services.ManagerService;

@RestController
@RequestMapping("/api/managers")   // keeping existing base path
@CrossOrigin("*")
public class ManagerController {

    @Autowired
    private ManagerService service;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private TaskRepository taskRepository;

    // ================= CREATE MANAGER =================
    @PostMapping
    public Manager save(@RequestBody Manager manager) {
        return service.save(manager);
    }

    // ================= GET ALL MANAGERS =================
    @GetMapping
    public List<Manager> getAll() {
        return service.getAll();
    }

    // ================= MANAGER LOGIN =================
    @PostMapping("/login")
    public Manager login(@RequestBody Manager manager) {
        return service.login(manager.getEmail(), manager.getPassword());
    }

    // ================= ASSIGN MANAGER =================
    @PutMapping("/assign")
    public ResponseEntity<?> assignManager(@RequestBody AssignManagerRequest req) {
        service.assignManager(req.getManagerId(), req.getAssignment());
        return ResponseEntity.ok("Manager assignment updated");
    }

    // ================= MANAGER DASHBOARD APIs =================

    // ✅ View projects assigned to logged-in manager
    @GetMapping("/projects/{managerId}")
    public List<Project> getMyProjects(@PathVariable Long managerId) {
        return projectRepository.findByManager_ManagerId(managerId);
    }

    // ✅ View tasks of a project
    @GetMapping("/tasks/{projectId}")
    public List<Task> getProjectTasks(@PathVariable Long projectId) {
        return taskRepository.findByProject_ProjectId(projectId);
    }
}
