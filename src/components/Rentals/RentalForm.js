import React, { useState, useEffect, useCallback } from "react";
import { Button, TextField, Paper, MenuItem } from "@mui/material";
import {
  createRental,
  updateRental,
  getRentalById,
} from "../../services/rentalService";
import { getBooks } from "../../services/bookService";
import { getUsers } from "../../services/userService";
import { useNavigate, useParams } from "react-router-dom";

const RentalForm = () => {
  const [rental, setRental] = useState({
    bookId: "",
    userId: "",
    rentalDate: "",
    dueDate: "",
  });
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  // Memoized functions to prevent re-creation on every render
  const fetchRental = useCallback(async () => {
    if (id) {
      try {
        const response = await getRentalById(id);
        setRental(response.data);
      } catch (error) {
        console.error("Error fetching rental:", error);
      }
    }
  }, [id]);

  const fetchBooks = useCallback(async () => {
    try {
      const response = await getBooks();
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  }, []);

  const fetchUsers = useCallback(async () => {
    try {
      const response = await getUsers();
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }, []);

  useEffect(() => {
    fetchBooks();
    fetchUsers();
    fetchRental();
  }, [fetchBooks, fetchUsers, fetchRental]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRental((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateRental(id, rental);
      } else {
        await createRental(rental);
      }
      navigate("/rentals");
    } catch (error) {
      console.error("Error saving rental:", error);
    }
  };

  return (
    <Paper style={{ padding: "16px", maxWidth: "400px", margin: "auto" }}>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          select
          label="Book"
          name="bookId"
          value={rental.bookId}
          onChange={handleChange}
          margin="normal"
          required
        >
          {books.map((book) => (
            <MenuItem key={book.id} value={book.id}>
              {book.title}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          fullWidth
          select
          label="User"
          name="userId"
          value={rental.userId}
          onChange={handleChange}
          margin="normal"
          required
        >
          {users.map((user) => (
            <MenuItem key={user.id} value={user.id}>
              {user.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          fullWidth
          label="Rental Date"
          name="rentalDate"
          type="date"
          value={rental.rentalDate}
          onChange={handleChange}
          margin="normal"
          required
          slotProps={{ inputLabel: { shrink: true } }}
        />
        <TextField
          fullWidth
          label="Due Date"
          name="dueDate"
          type="date"
          value={rental.dueDate}
          onChange={handleChange}
          margin="normal"
          required
          slotProps={{ inputLabel: { shrink: true } }}
        />
        <Button type="submit" variant="contained" color="primary">
          {id ? "Update Rental" : "Create Rental"}
        </Button>
      </form>
    </Paper>
  );
};

export default RentalForm;
