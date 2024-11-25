import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Button } from "@mui/material";
import BookList from "../components/Books/BookList";
import BookForm from "../components/Books/BookForm";

const BooksPage = () => {
  return (
    <div style={{ padding: "16px" }}>
      <h1>Books</h1>
      <Link to="/books/new" style={{ textDecoration: "none" }}>
        <Button
          variant="contained"
          color="primary"
          style={{ marginBottom: "16px" }}
        >
          Add New Book
        </Button>
      </Link>
      <Routes>
        <Route path="/" element={<BookList />} />
        <Route path="/new" element={<BookForm />} />
        <Route path="/edit/:id" element={<BookForm />} />
      </Routes>
    </div>
  );
};

export default BooksPage;
