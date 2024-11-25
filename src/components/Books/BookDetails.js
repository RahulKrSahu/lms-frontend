import React, { useState, useEffect } from "react";
import { Paper, Typography, CircularProgress } from "@mui/material";
import { getBookById } from "../../services/bookService";
import { useParams } from "react-router-dom";
import BookActions from "./BookActions";

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await getBookById(id);
        setBook(response.data);
      } catch (error) {
        console.error("Error fetching book:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Paper style={{ padding: "16px", maxWidth: "600px", margin: "auto" }}>
      <Typography variant="h5">Book Details</Typography>
      <Typography variant="h6">Title: {book.title}</Typography>
      <Typography variant="h6">Genre: {book.genre}</Typography>
      <Typography variant="h6">Price: ${book.price}</Typography>
      <Typography variant="h6">Quantity: {book.quantity}</Typography>
      <BookActions bookId={book.id} />
    </Paper>
  );
};

export default BookDetails;
