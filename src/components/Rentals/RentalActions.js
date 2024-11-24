import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { deleteRental } from "../../services/rentalService";

const RentalActions = ({ rentalId }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/rentals/edit/${rentalId}`);
  };

  const handleDelete = async () => {
    try {
      await deleteRental(rentalId);
      navigate("/rentals");
    } catch (error) {
      console.error("Error deleting rental:", error);
    }
  };

  return (
    <div>
      <Button
        onClick={handleEdit}
        variant="contained"
        color="primary"
        style={{ marginRight: "8px" }}
      >
        Edit
      </Button>
      <Button onClick={handleDelete} variant="contained" color="secondary">
        Delete
      </Button>
    </div>
  );
};

export default RentalActions;
