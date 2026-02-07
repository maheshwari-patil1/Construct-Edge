package com.ConstructionEdge.services;

import com.ConstructionEdge.entity.TaskStatus;
import com.ConstructionEdge.repo.*;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class DashboardService {

    private final ProjectRepository projectRepo;
    private final EmployeeRepository employeeRepo;
    private final TaskRepository taskRepo;
    private final InventoryRepository inventoryRepo;

    public DashboardService(
            ProjectRepository projectRepo,
            EmployeeRepository employeeRepo,
            TaskRepository taskRepo,
            InventoryRepository inventoryRepo
    ) {
        this.projectRepo = projectRepo;
        this.employeeRepo = employeeRepo;
        this.taskRepo = taskRepo;
        this.inventoryRepo = inventoryRepo;
    }

    /* ================= DASHBOARD STATS ================= */

    public Map<String, Object> getDashboardStats() {

        Map<String, Object> map = new HashMap<>();

        // ✅ Projects
        map.put("totalProjects",
                projectRepo.count());

        map.put("activeProjects",
                projectRepo.countByStatusIgnoreCase("Active"));

        // ✅ Employees
        map.put("totalEmployees",
                employeeRepo.count());

        map.put("availableEmployees",
                employeeRepo.countByProjectIsNull());

        // ✅ Tasks
        map.put("pendingTasks",
                taskRepo.countByStatus(TaskStatus.TODO));

        map.put("completedTasksThisMonth",
                taskRepo.countByStatus(TaskStatus.COMPLETED));

        // ✅ Inventory
        map.put("lowStockItems",
                inventoryRepo.countByQuantityLessThan(10));

        return map;
    }

    /* ================= COMPANY STATS (NEW) ================= */

    public Map<String, Object> getCompanyStats() {

        Map<String, Object> map = new HashMap<>();

        map.put("employees",
                employeeRepo.count());

        map.put("activeProjects",
                projectRepo.countByStatusIgnoreCase("ACTIVE"));

        return map;
    }
}
