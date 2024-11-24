import React, { useState, useEffect } from "react";
import { Paper, Typography, CircularProgress } from "@mui/material";
import { getUserById } from "../../services/userService";
import { useParams } from "react-router-dom";
import UserActions from "./UserActions";

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUserById(id);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Paper style={{ padding: "16px", maxWidth: "600px", margin: "auto" }}>
      <Typography variant="h5">User Details</Typography>
      <Typography variant="h6">Name: {user.name}</Typography>
      <Typography variant="h6">Email: {user.email}</Typography>
      <UserActions userId={user.id} />
    </Paper>
  );
};

export default UserDetails;
