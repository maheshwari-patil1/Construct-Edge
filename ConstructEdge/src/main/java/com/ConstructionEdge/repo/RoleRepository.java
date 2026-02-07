package com.ConstructionEdge.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ConstructionEdge.entity.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {
}

