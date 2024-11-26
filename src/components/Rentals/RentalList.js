import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import {
  getRentals,
  markAsReturned,
  markAsLost,
} from "../../services/rentalService";
import { useNavigate } from "react-router-dom";

const RentalList = () => {
  const [rentals, setRentals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRentals();
  }, []);

  const fetchRentals = async () => {
    try {
      const response = await getRentals();
      setRentals(response.data);
    } catch (error) {
      console.error("Error fetching rentals:", error);
    }
  };

  const handleMarkAsReturned = async (id) => {
    try {
      await markAsReturned(id);
      fetchRentals();
    } catch (error) {
      console.error("Error marking rental as returned:", error);
    }
  };

  const handleMarkAsLost = async (id) => {
    try {
      await markAsLost(id);
      fetchRentals();
    } catch (error) {
      console.error("Error marking rental as lost:", error);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Book</TableCell>
            <TableCell>User</TableCell>
            <TableCell>Rental Date</TableCell>
            <TableCell>Due Date</TableCell>
            <TableCell>Return Date</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Fee</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rentals.map((rental) => {
            const isDisabled = rental.isReturned || rental.lost; // Determine if the record should be disabled
            return (
              <TableRow
                key={rental.id}
                style={{
                  backgroundColor: isDisabled ? "#f5f5f5" : "white",
                  color: isDisabled ? "#9e9e9e" : "black",
                }}
              >
                <TableCell>{rental.id}</TableCell>
                <TableCell>{rental.book.title}</TableCell>
                <TableCell>{rental.user.name}</TableCell>
                <TableCell>{rental.rentalDate}</TableCell>
                <TableCell>{rental.dueDate}</TableCell>
                <TableCell>{rental.returnDate || "Not Returned"}</TableCell>
                <TableCell>
                  {rental.lost
                    ? "Lost"
                    : rental.isReturned
                    ? "Returned"
                    : "Active"}
                </TableCell>
                <TableCell>
                  {rental.fee !== null && rental.fee !== undefined
                    ? rental.fee.toFixed(2)
                    : "N/A"}
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate(`/rentals/edit/${rental.id}`)}
                    style={{ marginRight: "8px" }}
                    disabled={isDisabled}
                  >
                    Edit
                  </Button>
                  {!rental.isReturned && !rental.lost && (
                    <>
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => handleMarkAsReturned(rental.id)}
                        style={{ marginRight: "8px" }}
                      >
                        Mark as Returned
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleMarkAsLost(rental.id)}
                      >
                        Mark as Lost
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RentalList;
