package com.example.blood_donation_management.service;

import com.example.blood_donation_management.entity.Camp;
import com.example.blood_donation_management.repository.CampRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CampService {

    private final CampRepository repository;

    public CampService(CampRepository repository) {
        this.repository = repository;
    }

    public Camp addCamp(Camp camp) {
        return repository.save(camp);
    }

    public List<Camp> getAllCamps() {
        return repository.findAll();
    }

    public Optional<Camp> getCampById(Integer id) {
        return repository.findById(id);
    }

    public Camp updateCamp(Integer id, Camp camp) {

        Camp existingCamp = repository.findById(id).orElseThrow();

        existingCamp.setCampName(camp.getCampName());
        existingCamp.setLocation(camp.getLocation());
        existingCamp.setCampDate(camp.getCampDate());
        existingCamp.setOrganizer(camp.getOrganizer());

        return repository.save(existingCamp);
    }

    public boolean deleteCamp(Integer id) {

        if (repository.existsById(id)) {
            repository.deleteById(id);
            return true;
        }

        return false;
    }

    public List<Camp> getCampsAboveAverage() {
        return repository.findCampsAboveAverage();
    }
}