package com.ConstructionEdge.controller;

import com.ConstructionEdge.services.CompanyService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/company")
@CrossOrigin("*")
public class CompanyController {

    private final CompanyService companyService;

    public CompanyController(CompanyService companyService) {
        this.companyService = companyService;
    }

    @GetMapping("/stats")
    public Map<String, Object> getCompanyStats() {
        return companyService.getCompanyStats();
    }
}
