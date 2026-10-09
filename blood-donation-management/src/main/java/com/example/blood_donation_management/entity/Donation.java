package com.example.blood_donation_management.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "donations")
public class Donation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "donor_id")
    private Integer donorId;

    @Column(name = "camp_id")
    private Integer campId;

    @Column(name = "donation_date")
    private LocalDate donationDate;

    @Column(name = "quantity_ml")
    private Integer quantityMl;

    private String status;

    public Donation() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getDonorId() {
        return donorId;
    }

    public void setDonorId(Integer donorId) {
        this.donorId = donorId;
    }

    public Integer getCampId() {
        return campId;
    }

    public void setCampId(Integer campId) {
        this.campId = campId;
    }

    public LocalDate getDonationDate() {
        return donationDate;
    }

    public void setDonationDate(LocalDate donationDate) {
        this.donationDate = donationDate;
    }

    public Integer getQuantityMl() {
        return quantityMl;
    }

    public void setQuantityMl(Integer quantityMl) {
        this.quantityMl = quantityMl;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}