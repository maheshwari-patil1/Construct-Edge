package com.ConstructionEdge.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.ConstructionEdge.entity.Admin;
import com.ConstructionEdge.services.AdminService;

@RestController
@RequestMapping("/api/admins")
@CrossOrigin("*")
public class AdminController {

    @Autowired
    private AdminService adminService;

    // ✅ CREATE ADMIN
    @PostMapping
    public Admin save(@RequestBody Admin admin) {
        return adminService.save(admin);
    }

    // ✅ GET ALL ADMINS
    @GetMapping
    public List<Admin> getAll() {
        return adminService.getAll();
    }
}
