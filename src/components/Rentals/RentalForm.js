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
    book: {
      id: "",
    },
    user: {
      id: "",
    },
    rentalDate: "",
    dueDate: "",
  });

  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch rental details if editing
  const fetchRental = useCallback(async () => {
    if (id) {
      try {
        const response = await getRentalById(id);
        const rentalData = response.data;

        setRental({
          book: {
            id: rentalData.book.id,
          },
          user: {
            id: rentalData.user.id,
          },
          rentalDate: rentalData.rentalDate,
          dueDate: rentalData.dueDate,
        });
      } catch (error) {
        console.error("Error fetching rental:", error);
      }
    }
  }, [id]);

  // Fetch books
  const fetchBooks = useCallback(async () => {
    try {
      const response = await getBooks();
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  }, []);

  // Fetch users
  const fetchUsers = useCallback(async () => {
    try {
      const response = await getUsers();
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }, []);

  // Fetch all data on component mount
  useEffect(() => {
    fetchBooks();
    fetchUsers();
    fetchRental();
  }, [fetchBooks, fetchUsers, fetchRental]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "bookId") {
      setRental((prev) => ({
        ...prev,
        book: { id: value },
      }));
    } else if (name === "userId") {
      setRental((prev) => ({
        ...prev,
        user: { id: value },
      }));
    } else {
      setRental((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const rentalPayload = {
      book: {
        id: parseInt(rental.book.id, 10),
      },
      user: {
        id: parseInt(rental.user.id, 10),
      },
      rentalDate: rental.rentalDate,
      dueDate: rental.dueDate,
    };

    try {
      if (id) {
        await updateRental(id, rentalPayload);
      } else {
        await createRental(rentalPayload);
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
          value={rental.book.id}
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
          value={rental.user.id}
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
