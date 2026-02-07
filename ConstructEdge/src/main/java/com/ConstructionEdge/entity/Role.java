package com.ConstructionEdge.entity;

import jakarta.persistence.*;

@Entity
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long roleId;

    @Column(nullable = false)
    private String roleName;

    // ✅ Getter
    public String getRoleName() {
        return roleName;
    }

    // ✅ Setter
    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    // ✅ Getter for ID
    public Long getRoleId() {
        return roleId;
    }

    // ✅ Setter for ID
    public void setRoleId(Long roleId) {
        this.roleId = roleId;
    }
}
