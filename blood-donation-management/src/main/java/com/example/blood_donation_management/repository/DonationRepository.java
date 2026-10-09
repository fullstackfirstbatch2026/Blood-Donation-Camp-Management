package com.example.blood_donation_management.repository;

import com.example.blood_donation_management.dto.DonationDetails;
import com.example.blood_donation_management.entity.Donation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DonationRepository extends JpaRepository<Donation, Integer> {

    @Query(value = """
            SELECT
                d.id AS donationId,
                dr.id AS donorId,
                dr.name AS donorName,
                bg.blood_group AS bloodGroup,
                c.id AS campId,
                c.camp_name AS campName,
                c.location AS location,
                d.donation_date AS donationDate,
                d.quantity_ml AS quantityMl,
                d.status AS status
            FROM donations d
            JOIN donors dr ON d.donor_id = dr.id
            JOIN blood_groups bg ON dr.blood_group_id = bg.id
            JOIN camps c ON d.camp_id = c.id
            """, nativeQuery = true)
    List<DonationDetails> getDonationDetails();

    @Query(value = "SELECT count_donations_by_blood_group(:bloodGroupId)", nativeQuery = true)
    Integer countDonationsByBloodGroup(
            @Param("bloodGroupId") Integer bloodGroupId
    );
}