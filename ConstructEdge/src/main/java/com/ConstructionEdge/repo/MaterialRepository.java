package com.ConstructionEdge.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ConstructionEdge.entity.Material;

public interface MaterialRepository extends JpaRepository<Material, Long> {
}

