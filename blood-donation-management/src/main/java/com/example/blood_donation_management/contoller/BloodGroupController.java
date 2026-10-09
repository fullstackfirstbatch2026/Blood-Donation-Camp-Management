package com.example.blood_donation_management.controller;

import com.example.blood_donation_management.entity.BloodGroup;
import com.example.blood_donation_management.service.BloodGroupService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/blood-groups")
public class BloodGroupController {

    private final BloodGroupService service;

    public BloodGroupController(BloodGroupService service) {
        this.service = service;
    }

    @GetMapping
    public List<BloodGroup> getAllBloodGroups() {
        return service.getAllBloodGroups();
    }
}