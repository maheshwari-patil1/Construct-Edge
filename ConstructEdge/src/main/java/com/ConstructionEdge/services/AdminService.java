package com.ConstructionEdge.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ConstructionEdge.entity.Admin;
import com.ConstructionEdge.repo.AdminRepository;

@Service
public class AdminService {

    @Autowired
    private AdminRepository repo;

    public Admin save(Admin admin) {
        return repo.save(admin);
    }

    public List<Admin> getAll() {
        return repo.findAll();
    }
}
