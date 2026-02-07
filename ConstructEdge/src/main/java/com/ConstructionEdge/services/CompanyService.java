package com.ConstructionEdge.services;

import com.ConstructionEdge.repo.EmployeeRepository;
import com.ConstructionEdge.repo.ProjectRepository;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class CompanyService {

    private final EmployeeRepository employeeRepo;
    private final ProjectRepository projectRepo;

    public CompanyService(
            EmployeeRepository employeeRepo,
            ProjectRepository projectRepo
    ) {
        this.employeeRepo = employeeRepo;
        this.projectRepo = projectRepo;
    }

    public Map<String, Object> getCompanyStats() {

        Map<String, Object> map = new HashMap<>();

        map.put("employees", employeeRepo.count());

        map.put("activeProjects",
                projectRepo.countByStatusIgnoreCase("ACTIVE"));

        return map;
    }
}
