package com.ConstructionEdge.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ConstructionEdge.entity.Role;
import com.ConstructionEdge.repo.RoleRepository;

@Service
public class RoleService {

    @Autowired
    private RoleRepository repo;

    public Role save(Role r) {
        return repo.save(r);
    }

    public List<Role> getAll() {
        return repo.findAll();
    }
}
