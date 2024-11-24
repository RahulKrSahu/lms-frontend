import React, { useState, useEffect } from "react";
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
    authorId: "",
  });
  const [authors, setAuthors] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchAuthors();
    if (id) fetchBook();
  }, [id]);

  const fetchBook = async () => {
    try {
      const response = await getBookById(id);
      setBook(response.data);
    } catch (error) {
      console.error("Error fetching book:", error);
    }
  };

  const fetchAuthors = async () => {
    try {
      const response = await getAuthors();
      setAuthors(response.data);
    } catch (error) {
      console.error("Error fetching authors:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateBook(id, book);
      } else {
        await createBook(book);
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
          value={book.authorId}
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
