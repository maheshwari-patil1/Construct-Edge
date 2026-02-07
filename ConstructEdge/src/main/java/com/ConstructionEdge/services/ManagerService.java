package com.ConstructionEdge.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ConstructionEdge.entity.Manager;
import com.ConstructionEdge.repo.ManagerRepository;

@Service
public class ManagerService {

    @Autowired
    private ManagerRepository repo;

    // ================= CREATE MANAGER =================
    public Manager save(Manager manager) {
        return repo.save(manager);
    }

    // ================= GET ALL MANAGERS =================
    public List<Manager> getAll() {
        return repo.findAll();
    }

    // ================= MANAGER LOGIN =================
    public Manager login(String email, String password) {
        return repo.findByEmailAndPassword(email, password).orElse(null);
    }

    // ================= ASSIGN MANAGER =================
    public void assignManager(Long managerId, String assignment) {

        Manager manager = repo.findById(managerId)
                .orElseThrow(() -> new RuntimeException("Manager not found"));

        
        repo.save(manager);
    }
}
