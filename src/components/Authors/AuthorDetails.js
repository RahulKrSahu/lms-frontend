import React, { useState, useEffect } from "react";
import { Paper, Typography, CircularProgress } from "@mui/material";
import { getAuthorById } from "../../services/authorService";
import { useParams } from "react-router-dom";
import AuthorActions from "./AuthorActions";

const AuthorDetails = () => {
  const { id } = useParams();
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const response = await getAuthorById(id);
        setAuthor(response.data);
      } catch (error) {
        console.error("Error fetching author:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthor();
  }, [id]);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Paper style={{ padding: "16px", maxWidth: "600px", margin: "auto" }}>
      <Typography variant="h5">Author Details</Typography>
      <Typography variant="h6">Name: {author.name}</Typography>
      <AuthorActions authorId={author.id} />
    </Paper>
  );
};

export default AuthorDetails;
