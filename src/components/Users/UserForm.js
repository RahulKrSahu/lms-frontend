import React, { useState, useEffect, useCallback } from "react";
import { Button, TextField, Paper } from "@mui/material";
import {
  createUser,
  updateUser,
  getUserById,
} from "../../services/userService";
import { useNavigate, useParams } from "react-router-dom";

const UserForm = () => {
  const [user, setUser] = useState({ name: "", email: "" });
  const { id } = useParams();
  const navigate = useNavigate();

  // Memoize fetchUser to avoid re-creation on every render
  const fetchUser = useCallback(async () => {
    if (id) {
      try {
        const response = await getUserById(id);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }
  }, [id]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateUser(id, user);
      } else {
        await createUser(user);
      }
      navigate("/users");
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  return (
    <Paper style={{ padding: "16px", maxWidth: "400px", margin: "auto" }}>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={user.name}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          value={user.email}
          onChange={handleChange}
          margin="normal"
          required
          type="email"
        />
        <Button type="submit" variant="contained" color="primary">
          {id ? "Update User" : "Create User"}
        </Button>
      </form>
    </Paper>
  );
};

export default UserForm;
