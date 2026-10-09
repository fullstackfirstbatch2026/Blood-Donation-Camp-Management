package com.example.blood_donation_management.dto;

import java.time.LocalDate;

public interface DonationDetails {

    Integer getDonationId();

    Integer getDonorId();

    String getDonorName();

    String getBloodGroup();

    Integer getCampId();

    String getCampName();

    String getLocation();

    LocalDate getDonationDate();

    Integer getQuantityMl();

    String getStatus();
}