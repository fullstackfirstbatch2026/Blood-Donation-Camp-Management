package com.example.blood_donation_management.controller;

import com.example.blood_donation_management.dto.DonationDetails;
import com.example.blood_donation_management.entity.Donation;
import com.example.blood_donation_management.service.DonationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/donations")
public class DonationController {

    private final DonationService service;

    public DonationController(DonationService service) {
        this.service = service;
    }

    @PostMapping
    public Donation addDonation(@RequestBody Donation donation) {
        return service.addDonation(donation);
    }

    @GetMapping
    public List<Donation> getAllDonations() {
        return service.getAllDonations();
    }

    @GetMapping("/details")
    public List<DonationDetails> getDonationDetails() {
        return service.getDonationDetails();
    }

    @GetMapping("/count/{bloodGroupId}")
    public Integer countDonationsByBloodGroup(
            @PathVariable Integer bloodGroupId) {

        return service.countDonationsByBloodGroup(bloodGroupId);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Donation> getDonationById(
            @PathVariable Integer id) {

        return service.getDonationById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public Donation updateDonation(
            @PathVariable Integer id,
            @RequestBody Donation donation) {

        return service.updateDonation(id, donation);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteDonation(
            @PathVariable Integer id) {

        boolean deleted = service.deleteDonation(id);

        if (deleted) {
            return ResponseEntity.ok("Donation deleted successfully");
        }

        return ResponseEntity.notFound().build();
    }
}