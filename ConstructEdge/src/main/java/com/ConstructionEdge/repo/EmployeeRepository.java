package com.ConstructionEdge.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ConstructionEdge.entity.Employee;

import java.util.Optional;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    Optional<Employee> findByEmailAndPassword(String email, String password);
    Optional<Employee> findByEmail(String email);

    // ✅ COUNT employees not assigned to any project
    long countByProjectIsNull();
}
