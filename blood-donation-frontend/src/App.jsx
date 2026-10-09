import { useEffect, useState } from "react";

import {
    getDonors,
    getCamps,
    getDonations,
    getBloodGroups,
    getDonationDetails,
    registerDonor,
    addCamp,
    updateCamp,
    deleteCamp,
    addDonation,
    updateDonation,
    deleteDonation
} from "./services/api";


import "./App.css";

const bloodGroupNames = {
    1: "A+",
    2: "A-",
    3: "B+",
    4: "B-",
    5: "AB-",
    6: "AB+",
    7: "O+",
    8: "O-"
};


function App() {

    const [activePage, setActivePage] = useState("Dashboard");

    const [donors, setDonors] = useState([]);
    const [camps, setCamps] = useState([]);
    const [donations, setDonations] = useState([]);
    const [bloodGroups, setBloodGroups] = useState([]);
    const [donationDetails, setDonationDetails] = useState([]);

    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    // =========================
    // DONOR FORM
    // =========================

    const [showDonorForm, setShowDonorForm] = useState(false);

    const [donorForm, setDonorForm] = useState({
        name: "",
        age: "",
        gender: "",
        phone: "",
        email: "",
        bloodGroupId: ""
    });

    // =========================
    // CAMP FORM
    // =========================

    const [showCampForm, setShowCampForm] = useState(false);
    const [editingCamp, setEditingCamp] = useState(null);

    const [campForm, setCampForm] = useState({
        campName: "",
        location: "",
        campDate: "",
        organizer: ""
    });

    // =========================
    // DONATION FORM
    // =========================

    const [showDonationForm, setShowDonationForm] = useState(false);
    const [editingDonation, setEditingDonation] = useState(null);

    const [donationForm, setDonationForm] = useState({
        donorId: "",
        campId: "",
        donationDate: "",
        quantityMl: "",
        status: "Completed"
    });

    // =========================
    // LOAD DATA
    // =========================

    const loadData = async () => {

        try {

            setLoading(true);
            setError("");

            const [
                donorsData,
                campsData,
                donationsData,
                bloodGroupsData,
                donationDetailsData
            ] = await Promise.all([
                getDonors(),
                getCamps(),
                getDonations(),
                getBloodGroups(),
                getDonationDetails()
            ]);

            setDonors(donorsData || []);
            setCamps(campsData || []);
            setDonations(donationsData || []);
            setBloodGroups(bloodGroupsData || []);
            setDonationDetails(donationDetailsData || []);

        } catch (err) {

            console.error(err);
            setError("Unable to load data from backend.");

        } finally {

            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    // =========================
    // DONOR FUNCTIONS
    // =========================

    const handleDonorChange = (e) => {

        setDonorForm({
            ...donorForm,
            [e.target.name]: e.target.value
        });
    };

    const handleRegisterDonor = async (e) => {

        e.preventDefault();

        try {

            setMessage("");
            setError("");

            await registerDonor(donorForm);

            setMessage("Donor registered successfully!");

            setDonorForm({
                name: "",
                age: "",
                gender: "",
                phone: "",
                email: "",
                bloodGroupId: ""
            });

            setShowDonorForm(false);

            await loadData();

        } catch (err) {

            console.error(err);
            setError(
                "Unable to register donor. Please check the entered details."
            );
        }
    };

    // =========================
    // CAMP FUNCTIONS
    // =========================

    const handleCampChange = (e) => {

        setCampForm({
            ...campForm,
            [e.target.name]: e.target.value
        });
    };

    const handleCampSubmit = async (e) => {

        e.preventDefault();

        try {

            setMessage("");
            setError("");

            if (editingCamp) {

                await updateCamp(
                    editingCamp.id,
                    campForm
                );

                setMessage("Camp updated successfully!");

            } else {

                await addCamp(campForm);

                setMessage("Camp added successfully!");
            }

            setCampForm({
                campName: "",
                location: "",
                campDate: "",
                organizer: ""
            });

            setEditingCamp(null);
            setShowCampForm(false);

            await loadData();

        } catch (err) {

            console.error(err);

            setError(
                "Unable to save camp. Please check the entered details."
            );
        }
    };

    const handleEditCamp = (camp) => {

        setEditingCamp(camp);

        setCampForm({
            campName: camp.campName || "",
            location: camp.location || "",
            campDate: camp.campDate || "",
            organizer: camp.organizer || ""
        });

        setShowCampForm(true);
        setMessage("");
        setError("");
    };

    const handleDeleteCamp = async (id) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this camp?"
        );

        if (!confirmed) {
            return;
        }

        try {

            setMessage("");
            setError("");

            await deleteCamp(id);

            setMessage("Camp deleted successfully!");

            await loadData();

        } catch (err) {

            console.error(err);
            setError("Unable to delete camp.");
        }
    };

    // =========================
    // DONATION FUNCTIONS
    // =========================

    const handleDonationChange = (e) => {

        setDonationForm({
            ...donationForm,
            [e.target.name]: e.target.value
        });
    };

    const handleDonationSubmit = async (e) => {

        e.preventDefault();

        try {

            setMessage("");
            setError("");

            const donationData = {
                donorId: Number(donationForm.donorId),
                campId: Number(donationForm.campId),
                donationDate: donationForm.donationDate,
                quantityMl: Number(donationForm.quantityMl),
                status: donationForm.status
            };

            if (editingDonation) {

                await updateDonation(
                    editingDonation.id,
                    donationData
                );

                setMessage("Donation updated successfully!");

            } else {

                await addDonation(donationData);

                setMessage("Donation added successfully!");
            }

            setDonationForm({
                donorId: "",
                campId: "",
                donationDate: "",
                quantityMl: "",
                status: "Completed"
            });

            setEditingDonation(null);
            setShowDonationForm(false);

            await loadData();

        } catch (err) {

            console.error(err);

            setError(
                "Unable to save donation. Please check the entered details."
            );
        }
    };

    const handleEditDonation = (donation) => {

        setEditingDonation(donation);

        setDonationForm({
            donorId: donation.donorId || "",
            campId: donation.campId || "",
            donationDate: donation.donationDate || "",
            quantityMl: donation.quantityMl || "",
            status: donation.status || "Completed"
        });

        setShowDonationForm(true);

        setMessage("");
        setError("");
    };

    const handleDeleteDonation = async (id) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this donation?"
        );

        if (!confirmed) {
            return;
        }

        try {

            setMessage("");
            setError("");

            await deleteDonation(id);

            setMessage("Donation deleted successfully!");

            await loadData();

        } catch (err) {

            console.error(err);

            setError("Unable to delete donation.");
        }
    };

    // =========================
    // DASHBOARD DATA
    // =========================

    const eligibleDonors = donors.filter(
        donor => donor.eligible === true
    ).length;

    const recentDonations = [...donationDetails]
        .slice(-5)
        .reverse();

    // =========================
    // PAGE CONTENT
    // =========================

    const renderPage = () => {

        // =========================
        // DASHBOARD
        // =========================

        if (activePage === "Dashboard") {

            return (
                <>
                    <div className="page-heading">

                        <div>
                            <h1>Blood Donation Dashboard</h1>
                            <p>
                                Manage donors, camps and blood donations
                            </p>
                        </div>

                    </div>

                    {message && (
                        <div className="success-message">
                            {message}
                        </div>
                    )}

                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}

                    <div className="stats-grid">

                        <div className="stat-card">

                            <div className="stat-icon">
                                🩸
                            </div>

                            <div>
                                <h3>Total Donors</h3>
                                <strong>{donors.length}</strong>
                            </div>

                        </div>

                        <div className="stat-card">

                            <div className="stat-icon">
                                ❤️
                            </div>

                            <div>
                                <h3>Eligible Donors</h3>
                                <strong>{eligibleDonors}</strong>
                            </div>

                        </div>

                        <div className="stat-card">

                            <div className="stat-icon">
                                🏥
                            </div>

                            <div>
                                <h3>Donation Camps</h3>
                                <strong>{camps.length}</strong>
                            </div>

                        </div>

                        <div className="stat-card">

                            <div className="stat-icon">
                                💉
                            </div>

                            <div>
                                <h3>Total Donations</h3>
                                <strong>{donations.length}</strong>
                            </div>

                        </div>

                    </div>

                    <div className="dashboard-grid">

                        <div className="dashboard-panel">

                            <div className="panel-header">
                                <h2>Recent Donations</h2>
                            </div>

                            {recentDonations.length === 0 ? (

                                <p className="empty-text">
                                    No donations available.
                                </p>

                            ) : (

                                <div className="table-container">

                                    <table>

                                        <thead>

                                            <tr>
                                                <th>Donor</th>
                                                <th>Blood Group</th>
                                                <th>Camp</th>
                                                <th>Date</th>
                                                <th>Quantity</th>
                                            </tr>

                                        </thead>

                                        <tbody>

                                            {recentDonations.map(
                                                (donation, index) => (

                                                    <tr key={index}>

                                                        <td>
                                                            {donation.donorName}
                                                        </td>

                                                        <td>
                                                            <span className="blood-badge">
                                                                {donation.bloodGroup}
                                                            </span>
                                                        </td>

                                                        <td>
                                                            {donation.campName}
                                                        </td>

                                                        <td>
                                                            {donation.donationDate}
                                                        </td>

                                                        <td>
                                                            {donation.quantityMl} ml
                                                        </td>

                                                    </tr>

                                                )
                                            )}

                                        </tbody>

                                    </table>

                                </div>
                            )}

                        </div>

                        <div className="dashboard-panel">

                            <div className="panel-header">
                                <h2>Blood Groups</h2>
                            </div>

                            <div className="blood-group-list">

                                {bloodGroups.map((group) => (

                                    <div
                                        className="blood-group-item"
                                        key={group.id}
                                    >

                                        <span className="blood-badge">
                                            {group.bloodGroup}
                                        </span>

                                        <span>
                                            Blood Group
                                        </span>

                                    </div>

                                ))}

                            </div>

                        </div>

                    </div>
                </>
            );
        }

        // =========================
        // DONORS
        // =========================

        if (activePage === "Donors") {

            return (
                <>
                    <div className="page-heading">

                        <div>
                            <h1>Donors</h1>
                            <p>
                                Manage registered blood donors
                            </p>
                        </div>

                        <button
                            className="primary-btn"
                            onClick={() => {

                                setShowDonorForm(true);
                                setMessage("");
                                setError("");

                            }}
                        >
                            + Register Donor
                        </button>

                    </div>

                    {message && (
                        <div className="success-message">
                            {message}
                        </div>
                    )}

                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}

                    {showDonorForm && (

                        <div className="form-panel">

                            <div className="panel-header">

                                <h2>
                                    Register New Donor
                                </h2>

                                <button
                                    className="close-btn"
                                    onClick={() =>
                                        setShowDonorForm(false)
                                    }
                                >
                                    ×
                                </button>

                            </div>

                            <form
                                className="donor-form"
                                onSubmit={handleRegisterDonor}
                            >

                                <div className="form-group">

                                    <label>Name</label>

                                    <input
                                        type="text"
                                        name="name"
                                        value={donorForm.name}
                                        onChange={handleDonorChange}
                                        required
                                    />

                                </div>

                                <div className="form-group">

                                    <label>Age</label>

                                    <input
                                        type="number"
                                        name="age"
                                        value={donorForm.age}
                                        onChange={handleDonorChange}
                                        required
                                    />

                                </div>

                                <div className="form-group">

                                    <label>Gender</label>

                                    <select
                                        name="gender"
                                        value={donorForm.gender}
                                        onChange={handleDonorChange}
                                        required
                                    >

                                        <option value="">
                                            Select Gender
                                        </option>

                                        <option value="Male">
                                            Male
                                        </option>

                                        <option value="Female">
                                            Female
                                        </option>

                                        <option value="Other">
                                            Other
                                        </option>

                                    </select>

                                </div>

                                <div className="form-group">

                                    <label>Phone</label>

                                    <input
                                        type="text"
                                        name="phone"
                                        value={donorForm.phone}
                                        onChange={handleDonorChange}
                                        required
                                    />

                                </div>

                                <div className="form-group">

                                    <label>Email</label>

                                    <input
                                        type="email"
                                        name="email"
                                        value={donorForm.email}
                                        onChange={handleDonorChange}
                                        required
                                    />

                                </div>

                                <div className="form-group">

                                    <label>Blood Group</label>

                                    <select
                                        name="bloodGroupId"
                                        value={donorForm.bloodGroupId}
                                        onChange={handleDonorChange}
                                        required
                                    >

                                        <option value="">
                                            Select Blood Group
                                        </option>

                                        {bloodGroups.map((group) => (

                                            <option
                                                key={group.id}
                                                value={group.id}
                                            >
                                                {group.bloodGroup}
                                            </option>

                                        ))}

                                    </select>

                                </div>

                                <div className="form-actions">

                                    <button
                                        type="button"
                                        className="cancel-btn"
                                        onClick={() =>
                                            setShowDonorForm(false)
                                        }
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="submit"
                                        className="primary-btn"
                                    >
                                        Register Donor
                                    </button>

                                </div>

                            </form>

                        </div>
                    )}

                    <div className="dashboard-panel">

                        <div className="panel-header">

                            <h2>Registered Donors</h2>

                            <span>
                                {donors.length} donors
                            </span>

                        </div>

                        <div className="table-container">

                            <table>

                                <thead>

                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Age</th>
                                        <th>Gender</th>
                                        <th>Phone</th>
                                        <th>Email</th>
                                        <th>Blood Group</th>
                                        <th>Last Donation</th>
                                        <th>Eligibility</th>
                                    </tr>

                                </thead>

                                <tbody>

                                    {donors.map((donor) => {

                                        const donorBloodGroupId =
                                            donor.bloodGroupId ??
                                            donor.bloodGroup?.id ??
                                            null;

                                        const bloodGroupName =
                                            bloodGroupNames[
                                                Number(donorBloodGroupId)
                                            ] ??
                                            bloodGroups.find(
                                                group =>
                                                    Number(group.id) ===
                                                    Number(donorBloodGroupId)
                                            )?.bloodGroup ??
                                            donor.bloodGroup?.bloodGroup ??
                                            donor.bloodGroup?.name ??
                                            (typeof donor.bloodGroup === "string"
                                                ? donor.bloodGroup
                                                : null) ??
                                            "Unknown";

                                        return (

                                            <tr key={donor.id}>

                                                <td>
                                                    {donor.id}
                                                </td>

                                                <td>
                                                    {donor.name}
                                                </td>

                                                <td>
                                                    {donor.age}
                                                </td>

                                                <td>
                                                    {donor.gender}
                                                </td>

                                                <td>
                                                    {donor.phone}
                                                </td>

                                                <td>
                                                    {donor.email}
                                                </td>

                                                <td>

                                                    <span className="blood-badge">
                                                        {bloodGroupName}
                                                    </span>

                                                </td>

                                                <td>
                                                    {donor.lastDonationDate ||
                                                        "Never"}
                                                </td>

                                                <td>

                                                    {donor.eligible ? (

                                                        <span className="eligible-badge">
                                                            Eligible
                                                        </span>

                                                    ) : (

                                                        <span className="not-eligible-badge">
                                                            Not Eligible
                                                        </span>

                                                    )}

                                                </td>

                                            </tr>

                                        );

                                    })}

                                </tbody>

                            </table>

                        </div>

                    </div>
                </>
            );
        }

        // =========================
        // CAMPS
        // =========================

        if (activePage === "Camps") {

            return (
                <>
                    <div className="page-heading">

                        <div>
                            <h1>Donation Camps</h1>
                            <p>
                                Manage blood donation camps
                            </p>
                        </div>

                        <button
                            className="primary-btn"
                            onClick={() => {

                                setEditingCamp(null);

                                setCampForm({
                                    campName: "",
                                    location: "",
                                    campDate: "",
                                    organizer: ""
                                });

                                setShowCampForm(true);

                                setMessage("");
                                setError("");

                            }}
                        >
                            + Add Camp
                        </button>

                    </div>

                    {message && (
                        <div className="success-message">
                            {message}
                        </div>
                    )}

                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}

                    {showCampForm && (

                        <div className="form-panel">

                            <div className="panel-header">

                                <h2>
                                    {editingCamp
                                        ? "Update Camp"
                                        : "Add New Camp"}
                                </h2>

                                <button
                                    className="close-btn"
                                    onClick={() => {

                                        setShowCampForm(false);
                                        setEditingCamp(null);

                                    }}
                                >
                                    ×
                                </button>

                            </div>

                            <form
                                className="donor-form"
                                onSubmit={handleCampSubmit}
                            >

                                <div className="form-group">

                                    <label>
                                        Camp Name
                                    </label>

                                    <input
                                        type="text"
                                        name="campName"
                                        value={campForm.campName}
                                        onChange={handleCampChange}
                                        placeholder="Enter camp name"
                                        required
                                    />

                                </div>

                                <div className="form-group">

                                    <label>
                                        Location
                                    </label>

                                    <input
                                        type="text"
                                        name="location"
                                        value={campForm.location}
                                        onChange={handleCampChange}
                                        placeholder="Enter location"
                                        required
                                    />

                                </div>

                                <div className="form-group">

                                    <label>
                                        Camp Date
                                    </label>

                                    <input
                                        type="date"
                                        name="campDate"
                                        value={campForm.campDate}
                                        onChange={handleCampChange}
                                        required
                                    />

                                </div>

                                <div className="form-group">

                                    <label>
                                        Organizer
                                    </label>

                                    <input
                                        type="text"
                                        name="organizer"
                                        value={campForm.organizer}
                                        onChange={handleCampChange}
                                        placeholder="Enter organizer name"
                                        required
                                    />

                                </div>

                                <div className="form-actions">

                                    <button
                                        type="button"
                                        className="cancel-btn"
                                        onClick={() => {

                                            setShowCampForm(false);
                                            setEditingCamp(null);

                                        }}
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="submit"
                                        className="primary-btn"
                                    >
                                        {editingCamp
                                            ? "Update Camp"
                                            : "Add Camp"}
                                    </button>

                                </div>

                            </form>

                        </div>
                    )}

                    <div className="dashboard-panel">

                        <div className="panel-header">

                            <h2>Available Camps</h2>

                            <span>
                                {camps.length} camps
                            </span>

                        </div>

                        {camps.length === 0 ? (

                            <p className="empty-text">
                                No donation camps available.
                            </p>

                        ) : (

                            <div className="table-container">

                                <table>

                                    <thead>

                                        <tr>
                                            <th>ID</th>
                                            <th>Camp Name</th>
                                            <th>Location</th>
                                            <th>Date</th>
                                            <th>Organizer</th>
                                            <th>Actions</th>
                                        </tr>

                                    </thead>

                                    <tbody>

                                        {camps.map((camp) => (

                                            <tr key={camp.id}>

                                                <td>
                                                    {camp.id}
                                                </td>

                                                <td>
                                                    {camp.campName}
                                                </td>

                                                <td>
                                                    {camp.location}
                                                </td>

                                                <td>
                                                    {camp.campDate}
                                                </td>

                                                <td>
                                                    {camp.organizer}
                                                </td>

                                                <td>

                                                    <div className="action-buttons">

                                                        <button
                                                            className="edit-btn"
                                                            onClick={() =>
                                                                handleEditCamp(
                                                                    camp
                                                                )
                                                            }
                                                        >
                                                            Edit
                                                        </button>

                                                        <button
                                                            className="delete-btn"
                                                            onClick={() =>
                                                                handleDeleteCamp(
                                                                    camp.id
                                                                )
                                                            }
                                                        >
                                                            Delete
                                                        </button>

                                                    </div>

                                                </td>

                                            </tr>

                                        ))}

                                    </tbody>

                                </table>

                            </div>
                        )}

                    </div>
                </>
            );
        }

        // =========================
        // DONATIONS
        // =========================

        if (activePage === "Donations") {

            return (
                <>
                    <div className="page-heading">

                        <div>
                            <h1>Donations</h1>

                            <p>
                                Manage blood donation records
                            </p>
                        </div>

                        <button
                            className="primary-btn"
                            onClick={() => {

                                setEditingDonation(null);

                                setDonationForm({
                                    donorId: "",
                                    campId: "",
                                    donationDate: "",
                                    quantityMl: "",
                                    status: "Completed"
                                });

                                setShowDonationForm(true);

                                setMessage("");
                                setError("");

                            }}
                        >
                            + Add Donation
                        </button>

                    </div>

                    {message && (
                        <div className="success-message">
                            {message}
                        </div>
                    )}

                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}

                    {showDonationForm && (

                        <div className="form-panel">

                            <div className="panel-header">

                                <h2>
                                    {editingDonation
                                        ? "Update Donation"
                                        : "Add New Donation"}
                                </h2>

                                <button
                                    className="close-btn"
                                    onClick={() => {

                                        setShowDonationForm(false);
                                        setEditingDonation(null);

                                    }}
                                >
                                    ×
                                </button>

                            </div>

                            <form
                                className="donor-form"
                                onSubmit={handleDonationSubmit}
                            >

                                <div className="form-group">

                                    <label>
                                        Select Donor
                                    </label>

                                    <select
                                        name="donorId"
                                        value={donationForm.donorId}
                                        onChange={handleDonationChange}
                                        required
                                    >

                                        <option value="">
                                            Select Donor
                                        </option>

                                        {donors.map((donor) => (

                                            <option
                                                key={donor.id}
                                                value={donor.id}
                                            >
                                                {donor.name} - ID {donor.id}
                                            </option>

                                        ))}

                                    </select>

                                </div>

                                <div className="form-group">

                                    <label>
                                        Select Camp
                                    </label>

                                    <select
                                        name="campId"
                                        value={donationForm.campId}
                                        onChange={handleDonationChange}
                                        required
                                    >

                                        <option value="">
                                            Select Camp
                                        </option>

                                        {camps.map((camp) => (

                                            <option
                                                key={camp.id}
                                                value={camp.id}
                                            >
                                                {camp.campName} - {camp.location}
                                            </option>

                                        ))}

                                    </select>

                                </div>

                                <div className="form-group">

                                    <label>
                                        Donation Date
                                    </label>

                                    <input
                                        type="date"
                                        name="donationDate"
                                        value={donationForm.donationDate}
                                        onChange={handleDonationChange}
                                        required
                                    />

                                </div>

                                <div className="form-group">

                                    <label>
                                        Quantity (ml)
                                    </label>

                                    <input
                                        type="number"
                                        name="quantityMl"
                                        value={donationForm.quantityMl}
                                        onChange={handleDonationChange}
                                        placeholder="Example: 450"
                                        min="1"
                                        required
                                    />

                                </div>

                                <div className="form-group">

                                    <label>
                                        Status
                                    </label>

                                    <select
                                        name="status"
                                        value={donationForm.status}
                                        onChange={handleDonationChange}
                                        required
                                    >

                                        <option value="Completed">
                                            Completed
                                        </option>

                                        <option value="Pending">
                                            Pending
                                        </option>

                                        <option value="Cancelled">
                                            Cancelled
                                        </option>

                                    </select>

                                </div>

                                <div className="form-actions">

                                    <button
                                        type="button"
                                        className="cancel-btn"
                                        onClick={() => {

                                            setShowDonationForm(false);
                                            setEditingDonation(null);

                                        }}
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="submit"
                                        className="primary-btn"
                                    >
                                        {editingDonation
                                            ? "Update Donation"
                                            : "Add Donation"}
                                    </button>

                                </div>

                            </form>

                        </div>
                    )}

                    <div className="dashboard-panel">

                        <div className="panel-header">

                            <h2>
                                Donation Records
                            </h2>

                            <span>
                                {donations.length} donations
                            </span>

                        </div>

                        {donations.length === 0 ? (

                            <p className="empty-text">
                                No donation records available.
                            </p>

                        ) : (

                            <div className="table-container">

                                <table>

                                    <thead>

                                        <tr>

                                            <th>ID</th>
                                            <th>Donor</th>
                                            <th>Camp</th>
                                            <th>Date</th>
                                            <th>Quantity</th>
                                            <th>Status</th>
                                            <th>Actions</th>

                                        </tr>

                                    </thead>

                                    <tbody>

                                        {donations.map((donation) => {

                                            const donor = donors.find(
                                                d =>
                                                    d.id ===
                                                    donation.donorId
                                            );

                                            const camp = camps.find(
                                                c =>
                                                    c.id ===
                                                    donation.campId
                                            );

                                            return (

                                                <tr key={donation.id}>

                                                    <td>
                                                        {donation.id}
                                                    </td>

                                                    <td>
                                                        {donor
                                                            ? donor.name
                                                            : `Donor ${donation.donorId}`}
                                                    </td>

                                                    <td>
                                                        {camp
                                                            ? camp.campName
                                                            : `Camp ${donation.campId}`}
                                                    </td>

                                                    <td>
                                                        {donation.donationDate}
                                                    </td>

                                                    <td>
                                                        {donation.quantityMl} ml
                                                    </td>

                                                    <td>
                                                        {donation.status}
                                                    </td>

                                                    <td>

                                                        <div className="action-buttons">

                                                            <button
                                                                className="edit-btn"
                                                                onClick={() =>
                                                                    handleEditDonation(
                                                                        donation
                                                                    )
                                                                }
                                                            >
                                                                Edit
                                                            </button>

                                                            <button
                                                                className="delete-btn"
                                                                onClick={() =>
                                                                    handleDeleteDonation(
                                                                        donation.id
                                                                    )
                                                                }
                                                            >
                                                                Delete
                                                            </button>

                                                        </div>

                                                    </td>

                                                </tr>

                                            );

                                        })}

                                    </tbody>

                                </table>

                            </div>
                        )}

                    </div>
                </>
            );
        }

        // =========================
        // BLOOD GROUPS
        // =========================

        if (activePage === "Blood Groups") {

            return (
                <>
                    <div className="page-heading">

                        <div>
                            <h1>Blood Groups</h1>

                            <p>
                                Available blood groups
                            </p>
                        </div>

                    </div>

                    <div className="dashboard-panel">

                        <div className="panel-header">
                            <h2>
                                Blood Group List
                            </h2>
                        </div>

                        <div className="blood-group-list">

                            {bloodGroups.map((group) => (

                                <div
                                    className="blood-group-item"
                                    key={group.id}
                                >

                                    <span className="blood-badge">
                                        {group.bloodGroup}
                                    </span>

                                    <span>
                                        Blood Group ID: {group.id}
                                    </span>

                                </div>

                            ))}

                        </div>

                    </div>
                </>
            );
        }

        return null;
    };

    // =========================
    // MAIN UI
    // =========================

    return (

        <div className="app">

            <aside className="sidebar">

                <div className="logo">

                    <div className="logo-icon">
                        🩸
                    </div>

                    <div>
                        <h2>
                            BloodCare
                        </h2>

                        <span>
                            Donation Management
                        </span>
                    </div>

                </div>

                <nav className="sidebar-nav">

                    <button
                        className={
                            activePage === "Dashboard"
                                ? "nav-item active"
                                : "nav-item"
                        }
                        onClick={() =>
                            setActivePage("Dashboard")
                        }
                    >
                        📊 Dashboard
                    </button>

                    <button
                        className={
                            activePage === "Donors"
                                ? "nav-item active"
                                : "nav-item"
                        }
                        onClick={() =>
                            setActivePage("Donors")
                        }
                    >
                        👥 Donors
                    </button>

                    <button
                        className={
                            activePage === "Camps"
                                ? "nav-item active"
                                : "nav-item"
                        }
                        onClick={() =>
                            setActivePage("Camps")
                        }
                    >
                        🏥 Camps
                    </button>

                    <button
                        className={
                            activePage === "Donations"
                                ? "nav-item active"
                                : "nav-item"
                        }
                        onClick={() =>
                            setActivePage("Donations")
                        }
                    >
                        💉 Donations
                    </button>

                    <button
                        className={
                            activePage === "Blood Groups"
                                ? "nav-item active"
                                : "nav-item"
                        }
                        onClick={() =>
                            setActivePage("Blood Groups")
                        }
                    >
                        🩸 Blood Groups
                    </button>

                </nav>

                <div className="sidebar-footer">

                    <div className="system-status">

                        <span className="status-dot"></span>

                        Backend Connected

                    </div>

                    <span>
                        Spring Boot • MySQL
                    </span>

                </div>

            </aside>

            <main className="main-content">

                {loading ? (

                    <div className="loading">
                        Loading...
                    </div>

                ) : (

                    renderPage()

                )}

            </main>

        </div>
    );
}

export default App;