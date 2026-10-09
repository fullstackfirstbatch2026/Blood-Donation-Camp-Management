package com.example.blood_donation_management.controller;

import com.example.blood_donation_management.entity.Camp;
import com.example.blood_donation_management.service.CampService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/camps")
public class CampController {

    private final CampService service;

    public CampController(CampService service) {
        this.service = service;
    }

    @PostMapping
    public Camp addCamp(@RequestBody Camp camp) {
        return service.addCamp(camp);
    }

    @GetMapping
    public List<Camp> getAllCamps() {
        return service.getAllCamps();
    }

    @GetMapping("/above-average")
    public List<Camp> getCampsAboveAverage() {
        return service.getCampsAboveAverage();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Camp> getCampById(@PathVariable Integer id) {

        return service.getCampById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public Camp updateCamp(
            @PathVariable Integer id,
            @RequestBody Camp camp) {

        return service.updateCamp(id, camp);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCamp(
            @PathVariable Integer id) {

        boolean deleted = service.deleteCamp(id);

        if (deleted) {
            return ResponseEntity.ok("Camp deleted successfully");
        }

        return ResponseEntity.notFound().build();
    }
}