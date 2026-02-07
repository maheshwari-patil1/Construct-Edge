package com.ConstructionEdge.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ConstructionEdge.entity.Customer;
import com.ConstructionEdge.repo.CustomerRepository;

@RestController
@RequestMapping("/api/customers")
@CrossOrigin("*")
public class CustomerController {

    @Autowired
    private CustomerRepository repo;

    @PostMapping
    public Customer save(@RequestBody Customer c) {
        return repo.save(c);
    }

    @GetMapping
    public List<Customer> getAll() {
        return repo.findAll();
    }
}
