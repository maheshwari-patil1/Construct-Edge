package com.ConstructionEdge.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ConstructionEdge.dto.RegisterRequest;
import com.ConstructionEdge.entity.Admin;
import com.ConstructionEdge.entity.Manager;
import com.ConstructionEdge.entity.Employee;
import com.ConstructionEdge.entity.User;
import com.ConstructionEdge.entity.RoleRegister;
import com.ConstructionEdge.repo.AdminRepository;
import com.ConstructionEdge.repo.ManagerRepository;
import com.ConstructionEdge.repo.EmployeeRepository;
import com.ConstructionEdge.repo.UserRepository;

@Service
public class AuthService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private ManagerRepository managerRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private UserRepository userRepository;

    // ================= RESET PASSWORD =================
    @Transactional
    public void resetPassword(String email, String newPassword) {

        Optional<Admin> adminOpt = adminRepository.findByEmail(email);
        if (adminOpt.isPresent()) {
            Admin admin = adminOpt.get();
            admin.setPassword(newPassword); // ✅ plain text
            adminRepository.save(admin);
            return;
        }

        Optional<Manager> managerOpt = managerRepository.findByEmail(email);
        if (managerOpt.isPresent()) {
            Manager manager = managerOpt.get();
            manager.setPassword(newPassword); // ✅ plain text
            managerRepository.save(manager);
            return;
        }

        Optional<Employee> empOpt = employeeRepository.findByEmail(email);
        if (empOpt.isPresent()) {
            Employee emp = empOpt.get();
            emp.setPassword(newPassword); // ✅ plain text
            employeeRepository.save(emp);
            return;
        }

        throw new RuntimeException("USER NOT FOUND");
    }

    // ================= REGISTRATION =================
    @Transactional
    public void register(RegisterRequest req) {

        if (userRepository.existsByEmail(req.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        // 1️⃣ Resolve role safely
        RoleRegister registerRole;
        try {
            registerRole = req.getRole() != null
                    ? RoleRegister.valueOf(req.getRole().toUpperCase())
                    : RoleRegister.EMPLOYEE;
        } catch (Exception e) {
            registerRole = RoleRegister.EMPLOYEE;
        }

        String finalRole = switch (registerRole) {
            case ADMIN -> "ADMIN";
            case MANAGER -> "MANAGER";
            default -> "EMPLOYEE";
        };

        // 2️⃣ Save into USERS table
        User user = new User();
        user.setName(req.getName());
        user.setEmail(req.getEmail());
        user.setPassword(req.getPassword()); // ✅ plain text
        user.setRole(finalRole);

        userRepository.save(user);

        // 3️⃣ Save into ROLE-SPECIFIC table
        switch (finalRole) {

            case "ADMIN" -> {
                Admin admin = new Admin();
                admin.setUsername(user.getName());
                admin.setEmail(user.getEmail());
                admin.setPassword(req.getPassword()); // ✅ plain
                adminRepository.save(admin);
            }

            case "MANAGER" -> {
                Manager manager = new Manager();
                manager.setName(user.getName());
                manager.setEmail(user.getEmail());
                manager.setPassword(req.getPassword()); // ✅ plain
                
                managerRepository.save(manager);
            }

            case "EMPLOYEE" -> {
                Employee emp = new Employee();
                emp.setEmpId(user.getId());
                emp.setUserId(user.getId().toString());
                emp.setName(user.getName());
                emp.setEmail(user.getEmail());
                emp.setPassword(user.getPassword());
                emp.setHireDate(java.time.LocalDate.now());

                employeeRepository.save(emp);
            }

        }

        System.out.println("USER REGISTERED SUCCESSFULLY: " + user.getEmail());
    }
}
