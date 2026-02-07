package com.ConstructionEdge.controller;

import com.ConstructionEdge.services.DashboardService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin("*")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    // Existing dashboard stats
    @GetMapping("/stats")
    public Map<String, Object> getStats() {
        return dashboardService.getDashboardStats();
    }

    // ✅ NEW: Company stats endpoint
    @GetMapping("/company-stats")
    public Map<String, Object> getCompanyStats() {
        return dashboardService.getCompanyStats();
    }
}
