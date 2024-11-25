import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { deleteAuthor } from "../../services/authorService";

const AuthorActions = ({ authorId }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/authors/edit/${authorId}`);
  };

  const handleDelete = async () => {
    try {
      await deleteAuthor(authorId);
      navigate("/authors");
    } catch (error) {
      console.error("Error deleting author:", error);
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

export default AuthorActions;
