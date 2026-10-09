package com.example.blood_donation_management.service;

import com.example.blood_donation_management.entity.BloodGroup;
import com.example.blood_donation_management.repository.BloodGroupRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BloodGroupService {

    private final BloodGroupRepository repository;

    public BloodGroupService(BloodGroupRepository repository) {
        this.repository = repository;
    }

    public List<BloodGroup> getAllBloodGroups() {
        return repository.findAll();
    }
}