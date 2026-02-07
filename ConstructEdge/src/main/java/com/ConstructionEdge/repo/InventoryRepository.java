package com.ConstructionEdge.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ConstructionEdge.entity.Inventory;

public interface InventoryRepository extends JpaRepository<Inventory, Long> {

    // ✅ Count items where quantity < given value
    long countByQuantityLessThan(int quantity);
}
