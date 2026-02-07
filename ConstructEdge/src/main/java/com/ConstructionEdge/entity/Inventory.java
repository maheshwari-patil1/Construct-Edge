package com.ConstructionEdge.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "inventory")
public class Inventory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String category;

    private int quantity;

    private String unit;

    private int minStock;

    private int maxStock;

    private double unitPrice;

    private String location;

    // ===== Getters & Setters =====

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCategory() {
        return category;
    }
 
    public void setCategory(String category) {
        this.category = category;
    }
 
    public int getQuantity() {
        return quantity;
    }
 
    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
 
    public String getUnit() {
        return unit;
    }
 
    public void setUnit(String unit) {
        this.unit = unit;
    }
 
    public int getMinStock() {
        return minStock;
    }
 
    public void setMinStock(int minStock) {
        this.minStock = minStock;
    }
 
    public int getMaxStock() {
        return maxStock;
    }
 
    public void setMaxStock(int maxStock) {
        this.maxStock = maxStock;
    }
 
    public double getUnitPrice() {
        return unitPrice;
    }
 
    public void setUnitPrice(double unitPrice) {
        this.unitPrice = unitPrice;
    }
 
    public String getLocation() {
        return location;
    }
 
    public void setLocation(String location) {
        this.location = location;
    }
}
