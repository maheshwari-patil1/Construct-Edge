package com.ConstructionEdge.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ConstructionEdge.entity.Employee;
import com.ConstructionEdge.entity.Role;
import com.ConstructionEdge.repo.EmployeeRepository;
import com.ConstructionEdge.repo.RoleRepository;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository repo;

    @Autowired
    private RoleRepository roleRepository;

    // ✅ SAVE (Default password + Role validation)
 // ✅ SAVE (Manual empId + Default password + Role validation)
    public Employee save(Employee emp) {

        // ✅ empId must be provided manually
        if (emp.getEmpId() == null) {
            throw new RuntimeException("empId is required");
        }

        // ✅ Prevent duplicate empId
        if (repo.existsById(emp.getEmpId())) {
            throw new RuntimeException("Employee already exists with empId: " + emp.getEmpId());
        }

        // ✅ Default password safety
        if (emp.getPassword() == null || emp.getPassword().isBlank()) {
            emp.setPassword("123");
        }

        // ✅ Attach managed Role from DB
        if (emp.getRole() != null && emp.getRole().getRoleId() != null) {

            Long roleId = emp.getRole().getRoleId();

            Role role = roleRepository.findById(roleId)
                    .orElseThrow(() ->
                            new RuntimeException("Role not found with id: " + roleId));

            emp.setRole(role);

        } else {
            throw new RuntimeException("Role is required");
        }

        return repo.save(emp);
    }



    // ✅ GET ALL
    public List<Employee> getAll() {
        return repo.findAll();
    }

    // ✅ LOGIN
    public Employee login(String email, String password) {
        return repo.findByEmailAndPassword(email, password).orElse(null);
    }

    // ✅ UPDATE EMPLOYEE (SAFE UPDATE)
    public Employee update(Long id, Employee emp) {

        Employee existing = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        existing.setName(emp.getName());
        existing.setEmail(emp.getEmail());
        existing.setJobRole(emp.getJobRole());
        existing.setSkill(emp.getSkill());
        existing.setContactNumber(emp.getContactNumber());
        existing.setExperienceYear(emp.getExperienceYear());
        existing.setUserId(emp.getUserId());
        existing.setHireDate(emp.getHireDate());

        // ✅ keep old password if null or blank
        if (emp.getPassword() != null && !emp.getPassword().isBlank()) {
            existing.setPassword(emp.getPassword());
        }

        // ✅ Attach managed Role if provided
        if (emp.getRole() != null && emp.getRole().getRoleId() != null) {
            Long roleId = emp.getRole().getRoleId();

            Role role = roleRepository.findById(roleId)
                    .orElseThrow(() -> new RuntimeException("Role not found with id: " + roleId));

            existing.setRole(role);
        }

        return repo.save(existing);
    }

    // ✅ DELETE EMPLOYEE
    public void delete(Long id) {
        if (!repo.existsById(id)) {
            throw new RuntimeException("Employee not found");
        }
        repo.deleteById(id);
    }
}
