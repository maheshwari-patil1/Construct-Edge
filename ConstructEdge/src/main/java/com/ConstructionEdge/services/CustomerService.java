package com.ConstructionEdge.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ConstructionEdge.entity.Customer;
import com.ConstructionEdge.repo.CustomerRepository;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository repo;

    public Customer save(Customer c) {
        return repo.save(c);
    }

    public List<Customer> getAll() {
        return repo.findAll();
    }
}
