import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Button } from "@mui/material";
import RentalList from "../components/Rentals/RentalList";
import RentalForm from "../components/Rentals/RentalForm";

const RentalsPage = () => {
  return (
    <div style={{ padding: "16px" }}>
      <h1>Rentals</h1>
      <Link to="/rentals/new" style={{ textDecoration: "none" }}>
        <Button
          variant="contained"
          color="primary"
          style={{ marginBottom: "16px" }}
        >
          Add New Rental
        </Button>
      </Link>
      <Routes>
        <Route path="/" element={<RentalList />} />
        <Route path="/new" element={<RentalForm />} />
        <Route path="/edit/:id" element={<RentalForm />} />
      </Routes>
    </div>
  );
};

export default RentalsPage;
