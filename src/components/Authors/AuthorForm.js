import React, { useState, useEffect, useCallback } from "react";
import { Button, TextField, Paper } from "@mui/material";
import {
  createAuthor,
  updateAuthor,
  getAuthorById,
} from "../../services/authorService";
import { useNavigate, useParams } from "react-router-dom";

const AuthorForm = () => {
  const [name, setName] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchAuthor = useCallback(async () => {
    try {
      const response = await getAuthorById(id);
      setName(response.data.name);
    } catch (error) {
      console.error("Error fetching author:", error);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchAuthor();
    }
  }, [id, fetchAuthor]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateAuthor(id, { name });
      } else {
        await createAuthor({ name });
      }
      navigate("/authors");
    } catch (error) {
      console.error("Error saving author:", error);
    }
  };

  return (
    <Paper style={{ padding: "16px", maxWidth: "400px", margin: "auto" }}>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Author Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
          required
        />
        <Button type="submit" variant="contained" color="primary">
          {id ? "Update Author" : "Create Author"}
        </Button>
      </form>
    </Paper>
  );
};

export default AuthorForm;
