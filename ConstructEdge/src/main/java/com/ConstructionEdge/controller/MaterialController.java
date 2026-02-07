package com.ConstructionEdge.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ConstructionEdge.entity.Material;
import com.ConstructionEdge.repo.MaterialRepository;

@RestController
@RequestMapping("/api/materials")
@CrossOrigin("*")
public class MaterialController {

    @Autowired
    private MaterialRepository repo;

    @PostMapping
    public Material save(@RequestBody Material m) {
        return repo.save(m);
    }

    @GetMapping
    public List<Material> getAll() {
        return repo.findAll();
    }
}
