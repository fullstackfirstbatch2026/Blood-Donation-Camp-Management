const API_BASE_URL = "http://localhost:8081/api";

async function request(url, options = {}) {

    const response = await fetch(`${API_BASE_URL}${url}`, {
        headers: {
            "Content-Type": "application/json",
            ...options.headers
        },
        ...options
    });

    const text = await response.text();

    if (!response.ok) {
        throw new Error(
            text || `Request failed: ${response.status}`
        );
    }

    if (!text) {
        return null;
    }

    try {
        return JSON.parse(text);
    } catch {
        return text;
    }
}


// =========================
// BLOOD GROUPS
// =========================

export const getBloodGroups = () =>
    request("/blood-groups");


// =========================
// DONORS
// =========================

export const getDonors = () =>
    request("/donors");

export const getDonorById = (id) =>
    request(`/donors/${id}`);

export const registerDonor = (donor) => {

    const params = new URLSearchParams({
        name: donor.name,
        age: donor.age,
        gender: donor.gender,
        phone: donor.phone,
        email: donor.email,
        bloodGroupId: donor.bloodGroupId
    });

    return request(`/donors/register?${params}`, {
        method: "POST"
    });
};


// =========================
// CAMPS
// =========================

export const getCamps = () =>
    request("/camps");

export const getCampsAboveAverage = () =>
    request("/camps/above-average");

export const addCamp = (camp) =>
    request("/camps", {
        method: "POST",
        body: JSON.stringify(camp)
    });

export const updateCamp = (id, camp) =>
    request(`/camps/${id}`, {
        method: "PUT",
        body: JSON.stringify(camp)
    });

export const deleteCamp = (id) =>
    request(`/camps/${id}`, {
        method: "DELETE"
    });


// =========================
// DONATIONS
// =========================

export const getDonations = () =>
    request("/donations");

export const getDonationById = (id) =>
    request(`/donations/${id}`);

export const addDonation = (donation) =>
    request("/donations", {
        method: "POST",
        body: JSON.stringify(donation)
    });

export const updateDonation = (id, donation) =>
    request(`/donations/${id}`, {
        method: "PUT",
        body: JSON.stringify(donation)
    });

export const deleteDonation = (id) =>
    request(`/donations/${id}`, {
        method: "DELETE"
    });


// =========================
// DONATION DETAILS / JOIN
// =========================

export const getDonationDetails = () =>
    request("/donations/details");


// =========================
// DONATION COUNT BY BLOOD GROUP
// =========================

export const getDonationCountByBloodGroup = (bloodGroupId) =>
    request(`/donations/count/${bloodGroupId}`);