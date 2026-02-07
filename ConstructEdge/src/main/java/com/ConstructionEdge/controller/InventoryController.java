package com.ConstructionEdge.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.ConstructionEdge.entity.Inventory;
import com.ConstructionEdge.services.InventoryService;

@RestController
@RequestMapping("/api/inventory")
@CrossOrigin("*")
public class InventoryController {

    @Autowired
    private InventoryService service;

    // ✅ CREATE
    @PostMapping
    public Inventory save(@RequestBody Inventory i) {
        return service.save(i);
    }

    // ✅ READ
    @GetMapping
    public List<Inventory> getAll() {
        return service.getAll();
    }

    // ✅ UPDATE
    @PutMapping("/{id}")
    public Inventory update(@PathVariable Long id, @RequestBody Inventory i) {
        return service.update(id, i);
    }

    // ✅ DELETE
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
