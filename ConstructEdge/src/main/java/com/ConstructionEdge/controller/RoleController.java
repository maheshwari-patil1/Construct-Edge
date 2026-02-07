package com.ConstructionEdge.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ConstructionEdge.entity.Role;
import com.ConstructionEdge.services.RoleService;

@RestController
@RequestMapping("/api/roles")
@CrossOrigin("*")
public class RoleController {

    @Autowired
    private RoleService service;

    // ✅ Save Role with validation
    @PostMapping
    public ResponseEntity<?> save(@RequestBody Role role) {

        if (role.getRoleName() == null || role.getRoleName().trim().isEmpty()) {
            return ResponseEntity.badRequest()
                    .body("roleName cannot be null or empty");
        }

        Role saved = service.save(role);
        return ResponseEntity.ok(saved);
    }

    // ✅ Get All Roles
    @GetMapping
    public List<Role> getAll() {
        return service.getAll();
    }
}
