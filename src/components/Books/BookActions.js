import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { deleteBook } from "../../services/bookService";

const BookActions = ({ bookId }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/books/edit/${bookId}`);
  };

  const handleDelete = async () => {
    try {
      await deleteBook(bookId);
      navigate("/books");
    } catch (error) {
      console.error("Error deleting book:", error);
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

export default BookActions;
