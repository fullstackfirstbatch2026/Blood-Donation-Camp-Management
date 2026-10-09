package com.example.blood_donation_management.repository;

import com.example.blood_donation_management.entity.Donor;
import org.springframework.data.jpa.repository.JpaRepository;


public interface DonorRepository extends JpaRepository<Donor, Integer> {

}
