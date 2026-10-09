package com.example.blood_donation_management.service;

import com.example.blood_donation_management.entity.Donor;
import jakarta.persistence.EntityManager;
import jakarta.persistence.ParameterMode;
import jakarta.persistence.StoredProcedureQuery;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DonorService {

    private final EntityManager entityManager;

    public DonorService(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    public List<Donor> getAllDonors() {
        return entityManager
                .createQuery("SELECT d FROM Donor d", Donor.class)
                .getResultList();
    }

    public Donor getDonorById(Integer id) {
        return entityManager.find(Donor.class, id);
    }

    public Donor registerDonor(
            String name,
            Integer age,
            String gender,
            String phone,
            String email,
            Integer bloodGroupId) {

        StoredProcedureQuery query =
                entityManager.createStoredProcedureQuery("register_donor");

        query.registerStoredProcedureParameter(
                "p_name",
                String.class,
                ParameterMode.IN
        );

        query.registerStoredProcedureParameter(
                "p_age",
                Integer.class,
                ParameterMode.IN
        );

        query.registerStoredProcedureParameter(
                "p_gender",
                String.class,
                ParameterMode.IN
        );

        query.registerStoredProcedureParameter(
                "p_phone",
                String.class,
                ParameterMode.IN
        );

        query.registerStoredProcedureParameter(
                "p_email",
                String.class,
                ParameterMode.IN
        );

        query.registerStoredProcedureParameter(
                "p_blood_group_id",
                Integer.class,
                ParameterMode.IN
        );

        query.setParameter("p_name", name);
        query.setParameter("p_age", age);
        query.setParameter("p_gender", gender);
        query.setParameter("p_phone", phone);
        query.setParameter("p_email", email);
        query.setParameter("p_blood_group_id", bloodGroupId);

        query.execute();

        return entityManager
                .createQuery(
                        "SELECT d FROM Donor d WHERE d.email = :email",
                        Donor.class
                )
                .setParameter("email", email)
                .getResultStream()
                .findFirst()
                .orElse(null);
    }
}