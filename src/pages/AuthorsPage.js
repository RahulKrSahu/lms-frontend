import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Button } from "@mui/material";
import AuthorList from "../components/Authors/AuthorList";
import AuthorForm from "../components/Authors/AuthorForm";

const AuthorsPage = () => {
  return (
    <div style={{ padding: "16px" }}>
      <h1>Authors</h1>
      <Link to="/authors/new" style={{ textDecoration: "none" }}>
        <Button
          variant="contained"
          color="primary"
          style={{ marginBottom: "16px" }}
        >
          Add New Author
        </Button>
      </Link>
      <Routes>
        <Route path="/" element={<AuthorList />} />
        <Route path="/new" element={<AuthorForm />} />
        <Route path="/edit/:id" element={<AuthorForm />} />
      </Routes>
    </div>
  );
};

export default AuthorsPage;
