import React, { useState, useEffect } from "react";
import { Paper, Typography, CircularProgress } from "@mui/material";
import { getRentalById } from "../../services/rentalService";
import { useParams } from "react-router-dom";
import RentalActions from "./RentalActions";

const RentalDetails = () => {
  const { id } = useParams();
  const [rental, setRental] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRental = async () => {
      try {
        const response = await getRentalById(id);
        setRental(response.data);
      } catch (error) {
        console.error("Error fetching rental:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRental();
  }, [id]);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Paper style={{ padding: "16px", maxWidth: "600px", margin: "auto" }}>
      <Typography variant="h5">Rental Details</Typography>
      <Typography variant="h6">Book: {rental.book.title}</Typography>
      <Typography variant="h6">User: {rental.user.name}</Typography>
      <Typography variant="h6">Rental Date: {rental.rentalDate}</Typography>
      <Typography variant="h6">Due Date: {rental.dueDate}</Typography>
      <RentalActions rentalId={rental.id} />
    </Paper>
  );
};

export default RentalDetails;
