package com.ConstructionEdge.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ConstructionEdge.entity.Manager;

import java.util.Optional;

public interface ManagerRepository extends JpaRepository<Manager, Long> {

    Optional<Manager> findByEmailAndPassword(String email, String password);
    Optional<Manager> findByEmail(String email);

}
