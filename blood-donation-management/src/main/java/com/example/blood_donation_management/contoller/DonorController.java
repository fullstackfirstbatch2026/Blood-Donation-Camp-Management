package com.example.blood_donation_management.controller;

import com.example.blood_donation_management.entity.Donor;
import com.example.blood_donation_management.service.DonorService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/donors")
public class DonorController {

    private final DonorService service;

    public DonorController(DonorService service) {
        this.service = service;
    }

    @GetMapping
    public List<Donor> getAllDonors() {
        return service.getAllDonors();
    }

    @GetMapping("/{id}")
    public Donor getDonorById(@PathVariable Integer id) {
        return service.getDonorById(id);
    }

    @PostMapping("/register")
    public Donor registerDonor(
            @RequestParam String name,
            @RequestParam Integer age,
            @RequestParam String gender,
            @RequestParam String phone,
            @RequestParam String email,
            @RequestParam Integer bloodGroupId) {

        return service.registerDonor(
                name,
                age,
                gender,
                phone,
                email,
                bloodGroupId
        );
    }
}