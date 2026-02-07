package com.ConstructionEdge.controller;

import com.ConstructionEdge.dto.TaskRequestDTO;
import com.ConstructionEdge.entity.Task;
import com.ConstructionEdge.entity.TaskStatus;
import com.ConstructionEdge.services.TaskService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin("*")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    /* ================= CREATE ================= */

    // ✅ DTO-based CREATE
    @PostMapping
    public Task createTask(@RequestBody TaskRequestDTO dto) {
        return taskService.createTask(dto);
    }

    /* ================= READ ================= */

    @GetMapping
    public List<Task> getAllTasks() {
        return taskService.getAllTasks();
    }

    /* ================= FILTER BY STATUS ================= */

    // Example: /api/tasks/status/TODO
    @GetMapping("/status/{status}")
    public List<Task> getTasksByStatus(@PathVariable TaskStatus status) {
        return taskService.getTasksByStatus(status);
    }

    /* ================= DASHBOARD STATS ================= */

    // Example: /api/tasks/stats
    @GetMapping("/stats")
    public Map<String, Long> getTaskStats() {
        return taskService.getTaskStats();
    }

    /* ================= UPDATE ================= */

    @PutMapping("/{id}")
    public Task updateTask(
            @PathVariable Long id,
            @RequestBody TaskRequestDTO dto
    ) {
        return taskService.updateTask(id, dto);
    }

    /* ================= DELETE ================= */

    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
    }
}
