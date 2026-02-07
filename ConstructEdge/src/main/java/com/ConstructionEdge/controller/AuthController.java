package com.ConstructionEdge.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.Random;

import com.ConstructionEdge.dto.RegisterRequest;
import com.ConstructionEdge.entity.Admin;
import com.ConstructionEdge.entity.Employee;
import com.ConstructionEdge.entity.Manager;
import com.ConstructionEdge.repo.AdminRepository;
import com.ConstructionEdge.repo.EmployeeRepository;
import com.ConstructionEdge.repo.ManagerRepository;
import com.ConstructionEdge.services.AuthService;
import com.ConstructionEdge.services.EmailService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {

    private Map<String, String> otpStore = new HashMap<>();

    @Autowired
    private EmailService emailService;

    @Autowired
    private AuthService authService;

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private ManagerRepository managerRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    // ================= REGISTER =================
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        authService.register(request);
        return ResponseEntity.ok(Map.of("message", "User registered successfully"));
    }

    // ================= LOGIN =================
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {

        String email = body.get("email");
        String password = body.get("password");

        Map<String, Object> res = new HashMap<>();

        Optional<Admin> admin = adminRepository.findByEmail(email);
        if (admin.isPresent() && admin.get().getPassword().equals(password)) {
            res.put("role", "ADMIN");
            res.put("user", admin.get());
            res.put("token", "dummy-token-123");
            return ResponseEntity.ok(res);
        }

        Optional<Manager> manager =
                managerRepository.findByEmailAndPassword(email, password);

        if (manager.isPresent()) {
            res.put("role", "MANAGER");
            res.put("user", manager.get());
            res.put("token", "dummy-token-123");
            return ResponseEntity.ok(res);
        }

        Optional<Employee> employee =
                employeeRepository.findByEmailAndPassword(email, password);

        if (employee.isPresent()) {
            res.put("role", "EMPLOYEE");
            res.put("user", employee.get());
            res.put("token", "dummy-token-123");
            return ResponseEntity.ok(res);
        }

        res.put("error", "Invalid email or password");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(res);
    }

    // ================= SEND OTP =================
    @GetMapping("/send-otp")
    public String sendOtp(@RequestParam String email) {

        String otp = String.valueOf(new Random().nextInt(900000) + 100000);
        otpStore.put(email, otp);

        emailService.sendOtp(email, otp);
        return "OTP sent to your email";
    }

    // ================= VERIFY OTP =================
    @PostMapping("/verify-otp")
    public String verifyOtp(@RequestBody Map<String, String> body) {

        String email = body.get("email");
        String otp = body.get("otp");

        if (otp.equals(otpStore.get(email))) {
            return "OTP verified successfully";
        } else {
            throw new RuntimeException("Invalid OTP");
        }
    }

    // ================= RESET PASSWORD =================
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> body) {

        String email = body.get("email");
        String newPassword = body.get("password");

        authService.resetPassword(email, newPassword);

        return ResponseEntity.ok("Password reset successfully");
    }
}
