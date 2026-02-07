package com.ConstructionEdge.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ConstructionEdge.entity.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
}
