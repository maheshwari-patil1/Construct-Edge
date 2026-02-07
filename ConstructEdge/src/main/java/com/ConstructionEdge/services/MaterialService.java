package com.ConstructionEdge.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ConstructionEdge.entity.Material;
import com.ConstructionEdge.repo.MaterialRepository;

@Service
public class MaterialService {

    @Autowired
    private MaterialRepository repo;

    public Material save(Material m) {
        return repo.save(m);
    }

    public List<Material> getAll() {
        return repo.findAll();
    }
}

