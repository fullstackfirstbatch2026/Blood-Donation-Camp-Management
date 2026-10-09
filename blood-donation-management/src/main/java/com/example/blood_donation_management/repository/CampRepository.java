package com.example.blood_donation_management.repository;

import com.example.blood_donation_management.entity.Camp;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CampRepository extends JpaRepository<Camp, Integer> {

    @Query(value = """
            SELECT c.*
            FROM camps c
            JOIN donations d ON c.id = d.camp_id
            GROUP BY c.id, c.camp_name, c.location, c.camp_date, c.organizer
            HAVING COUNT(d.id) > (
                SELECT AVG(donation_count)
                FROM (
                    SELECT camp_id, COUNT(*) AS donation_count
                    FROM donations
                    GROUP BY camp_id
                ) AS average_table
            )
            """, nativeQuery = true)
    List<Camp> findCampsAboveAverage();
}