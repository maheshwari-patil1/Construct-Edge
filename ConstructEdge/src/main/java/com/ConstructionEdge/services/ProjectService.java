package com.ConstructionEdge.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ConstructionEdge.entity.Project;
import com.ConstructionEdge.repo.ProjectRepository;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepo;

    // ✅ CREATE PROJECT (NO EMPLOYEE REQUIRED)
    public Project save(Project project) {
        return projectRepo.save(project);
    }

    public List<Project> getAll() {
        return projectRepo.findAll();
    }
}
