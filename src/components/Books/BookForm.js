import React, { useState, useEffect, useCallback } from "react";
import { Button, TextField, Paper, MenuItem } from "@mui/material";
import {
  createBook,
  updateBook,
  getBookById,
} from "../../services/bookService";
import { getAuthors } from "../../services/authorService";
import { useNavigate, useParams } from "react-router-dom";

const BookForm = () => {
  const [book, setBook] = useState({
    title: "",
    genre: "",
    price: "",
    quantity: "",
    author: {
      id: "",
    },
  });
  const [authors, setAuthors] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch the book details if editing an existing book
  const fetchBook = useCallback(async () => {
    if (id) {
      try {
        const response = await getBookById(id);
        const bookData = response.data;

        // Adapt book structure to match the state format
        setBook({
          title: bookData.title,
          genre: bookData.genre,
          price: bookData.price,
          quantity: bookData.quantity,
          author: {
            id: bookData.author.id,
          },
        });
      } catch (error) {
        console.error("Error fetching book:", error);
      }
    }
  }, [id]);

  // Fetch the list of authors
  const fetchAuthors = useCallback(async () => {
    try {
      const response = await getAuthors();
      setAuthors(response.data);
    } catch (error) {
      console.error("Error fetching authors:", error);
    }
  }, []);

  // Run the fetch functions on component mount
  useEffect(() => {
    fetchAuthors();
    fetchBook();
  }, [fetchAuthors, fetchBook]);

  // Handle changes to form fields
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle nested author object for "author.id"
    if (name === "authorId") {
      setBook((prev) => ({
        ...prev,
        author: { id: value },
      }));
    } else {
      setBook((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookPayload = {
      title: book.title,
      genre: book.genre,
      price: parseFloat(book.price),
      quantity: parseInt(book.quantity, 10),
      author: {
        id: parseInt(book.author.id, 10),
      },
    };

    try {
      if (id) {
        await updateBook(id, bookPayload);
      } else {
        await createBook(bookPayload);
      }
      navigate("/books");
    } catch (error) {
      console.error("Error saving book:", error);
    }
  };

  return (
    <Paper style={{ padding: "16px", maxWidth: "400px", margin: "auto" }}>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Title"
          name="title"
          value={book.title}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Genre"
          name="genre"
          value={book.genre}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Price"
          name="price"
          type="number"
          value={book.price}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Quantity"
          name="quantity"
          type="number"
          value={book.quantity}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          select
          label="Author"
          name="authorId"
          value={book.author.id}
          onChange={handleChange}
          margin="normal"
          required
        >
          {authors.map((author) => (
            <MenuItem key={author.id} value={author.id}>
              {author.name}
            </MenuItem>
          ))}
        </TextField>
        <Button type="submit" variant="contained" color="primary">
          {id ? "Update Book" : "Create Book"}
        </Button>
      </form>
    </Paper>
  );
};

export default BookForm;
