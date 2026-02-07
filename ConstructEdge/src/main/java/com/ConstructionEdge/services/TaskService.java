package com.ConstructionEdge.services;

import com.ConstructionEdge.dto.TaskRequestDTO;
import com.ConstructionEdge.entity.Employee;
import com.ConstructionEdge.entity.Project;
import com.ConstructionEdge.entity.Task;
import com.ConstructionEdge.entity.TaskStatus;
import com.ConstructionEdge.repo.EmployeeRepository;
import com.ConstructionEdge.repo.ProjectRepository;
import com.ConstructionEdge.repo.TaskRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@Transactional   // 🔥 VERY IMPORTANT
public class TaskService {

    private final TaskRepository taskRepository;
    private final ProjectRepository projectRepository;
    private final EmployeeRepository employeeRepository;

    public TaskService(
            TaskRepository taskRepository,
            ProjectRepository projectRepository,
            EmployeeRepository employeeRepository
    ) {
        this.taskRepository = taskRepository;
        this.projectRepository = projectRepository;
        this.employeeRepository = employeeRepository;
    }

    /* ================= CREATE TASK ================= */

    public Task createTask(TaskRequestDTO dto) {

        Project project = projectRepository.findById(dto.getProjectId())
                .orElseThrow(() -> new RuntimeException("Project not found"));

        Task task = new Task();
        task.setTitle(dto.getTitle());
        task.setDescription(dto.getDescription());
        task.setProject(project);
        task.setStatus(dto.getStatus());   // ✅ ENUM
        task.setPriority(dto.getPriority());
        task.setDueDate(dto.getDueDate());

        Set<Employee> assignedEmployees = validateEmployees(project, dto.getEmployeeIds());
        task.setAssignedEmployees(assignedEmployees);

        Task savedTask = taskRepository.save(task);

        // 🔥 MUST BE AFTER SAVE
        updateProjectProgress(project.getProjectId());

        return savedTask;
    }

    /* ================= READ ================= */

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    /* ================= UPDATE TASK ================= */

    public Task updateTask(Long id, TaskRequestDTO dto) {

        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        Project project = projectRepository.findById(dto.getProjectId())
                .orElseThrow(() -> new RuntimeException("Project not found"));

        task.setTitle(dto.getTitle());
        task.setDescription(dto.getDescription());
        task.setProject(project);
        task.setStatus(dto.getStatus());
        task.setPriority(dto.getPriority());
        task.setDueDate(dto.getDueDate());

        Set<Employee> assignedEmployees = validateEmployees(project, dto.getEmployeeIds());
        task.setAssignedEmployees(assignedEmployees);

        Task updatedTask = taskRepository.save(task);

        // 🔥 CRITICAL
        updateProjectProgress(project.getProjectId());

        return updatedTask;
    }

    /* ================= DELETE TASK ================= */

    public void deleteTask(Long id) {

        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        Long projectId = task.getProject().getProjectId();

        taskRepository.delete(task);

        // 🔥 WITHOUT THIS → progress stays stale
        updateProjectProgress(projectId);
    }

    /* ================= DASHBOARD STATS ================= */

    public Map<String, Long> getTaskStats() {

        Map<String, Long> map = new HashMap<>();

        map.put("pendingTasks",
                taskRepository.countByStatus(TaskStatus.TODO));

        map.put("inProgressTasks",
                taskRepository.countByStatus(TaskStatus.IN_PROGRESS));

        map.put("completedTasks",
                taskRepository.countByStatus(TaskStatus.COMPLETED));

        return map;
    }

    /* ================= FILTER BY STATUS ================= */

    public List<Task> getTasksByStatus(TaskStatus status) {
        return taskRepository.findByStatus(status);
    }

    /* ================= PROJECT PROGRESS CORE LOGIC ================= */

    private void updateProjectProgress(Long projectId) {

        long totalTasks =
                taskRepository.countByProject_ProjectId(projectId);

        long completedTasks =
                taskRepository.countByStatusAndProject_ProjectId(
                        TaskStatus.COMPLETED, projectId);

        int progress = (totalTasks == 0)
                ? 0
                : (int) ((completedTasks * 100) / totalTasks);

        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        project.setProgress(progress);

        // 🔥 STATUS SYNC (THIS FIXES DASHBOARD ACTIVE PROJECTS)
        if (progress == 0) {
            project.setStatus("PLANNING");
        } else if (progress < 100) {
            project.setStatus("ACTIVE");
        } else {
            project.setStatus("COMPLETED");
        }

        projectRepository.save(project);
    }

    /* ================= EMPLOYEE VALIDATION ================= */

    private Set<Employee> validateEmployees(Project project, Collection<Long> employeeIds) {

        Set<Employee> assignedEmployees = new HashSet<>();

        if (employeeIds == null || employeeIds.isEmpty()) {
            return assignedEmployees;
        }

        List<Employee> employees =
                employeeRepository.findAllById(employeeIds);

        for (Employee emp : employees) {
            if (!project.getEmployees().contains(emp)) {
                throw new RuntimeException(
                        "Employee " + emp.getEmpId() + " not part of project"
                );
            }
        }

        assignedEmployees.addAll(employees);
        return assignedEmployees;
    }
    
    public void recalculateAllProjectProgress() {
        projectRepository.findAll().forEach(project -> {
            updateProjectProgress(project.getProjectId());
        });
    }

}
