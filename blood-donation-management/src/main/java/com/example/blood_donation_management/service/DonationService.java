package com.example.blood_donation_management.service;

import com.example.blood_donation_management.dto.DonationDetails;
import com.example.blood_donation_management.entity.Donation;
import com.example.blood_donation_management.repository.DonationRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DonationService {

    private final DonationRepository repository;

    public DonationService(DonationRepository repository) {
        this.repository = repository;
    }

    public Donation addDonation(Donation donation) {
        return repository.save(donation);
    }

    public List<Donation> getAllDonations() {
        return repository.findAll();
    }

    public Optional<Donation> getDonationById(Integer id) {
        return repository.findById(id);
    }

    public Donation updateDonation(Integer id, Donation donation) {

        Donation existingDonation = repository.findById(id).orElseThrow();

        existingDonation.setDonorId(donation.getDonorId());
        existingDonation.setCampId(donation.getCampId());
        existingDonation.setDonationDate(donation.getDonationDate());
        existingDonation.setQuantityMl(donation.getQuantityMl());
        existingDonation.setStatus(donation.getStatus());

        return repository.save(existingDonation);
    }

    public boolean deleteDonation(Integer id) {

        if (repository.existsById(id)) {
            repository.deleteById(id);
            return true;
        }

        return false;
    }

    public List<DonationDetails> getDonationDetails() {
        return repository.getDonationDetails();
    }

    public Integer countDonationsByBloodGroup(Integer bloodGroupId) {
        return repository.countDonationsByBloodGroup(bloodGroupId);
    }
}