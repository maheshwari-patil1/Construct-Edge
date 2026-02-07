package com.ConstructionEdge.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ConstructionEdge.entity.Admin;

public interface AdminRepository extends JpaRepository<Admin, Long> {

    Optional<Admin> findByEmail(String email);

    Optional<Admin> findByUsername(String username);
}
