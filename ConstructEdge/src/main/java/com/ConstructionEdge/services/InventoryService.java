package com.ConstructionEdge.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ConstructionEdge.entity.Inventory;
import com.ConstructionEdge.repo.InventoryRepository;

@Service
public class InventoryService {

    @Autowired
    private InventoryRepository repo;

    // CREATE
    public Inventory save(Inventory i) {
        return repo.save(i);
    }

    // READ
    public List<Inventory> getAll() {
        return repo.findAll();
    }

    // UPDATE
    public Inventory update(Long id, Inventory updated) {
        Inventory existing = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Inventory item not found"));

        existing.setName(updated.getName());
        existing.setCategory(updated.getCategory());
        existing.setQuantity(updated.getQuantity());
        existing.setUnit(updated.getUnit());
        existing.setUnitPrice(updated.getUnitPrice());
        existing.setLocation(updated.getLocation());
        existing.setMinStock(updated.getMinStock());
        existing.setMaxStock(updated.getMaxStock());

        return repo.save(existing);
    }

    // DELETE
    public void delete(Long id) {
        repo.deleteById(id);
    }
}
