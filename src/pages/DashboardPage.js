import React, { useEffect, useState } from "react";
import {
  Grid2 as Grid,
  Paper,
  Typography,
  CircularProgress,
} from "@mui/material";
import { getAuthors } from "../services/authorService";
import { getBooks } from "../services/bookService";
import { getRentals } from "../services/rentalService";
import { getUsers } from "../services/userService";

const DashboardPage = () => {
  const [stats, setStats] = useState({
    authors: 0,
    books: 0,
    rentals: 0,
    users: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [authorsRes, booksRes, rentalsRes, usersRes] = await Promise.all([
          getAuthors(),
          getBooks(),
          getRentals(),
          getUsers(),
        ]);

        setStats({
          authors: authorsRes.data.length,
          books: booksRes.data.length,
          rentals: rentalsRes.data.length,
          users: usersRes.data.length,
        });
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <div style={{ padding: "16px" }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Paper style={{ padding: "16px", textAlign: "center" }}>
            <Typography variant="h6">Authors</Typography>
            <Typography variant="h4">{stats.authors}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper style={{ padding: "16px", textAlign: "center" }}>
            <Typography variant="h6">Books</Typography>
            <Typography variant="h4">{stats.books}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper style={{ padding: "16px", textAlign: "center" }}>
            <Typography variant="h6">Rentals</Typography>
            <Typography variant="h4">{stats.rentals}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper style={{ padding: "16px", textAlign: "center" }}>
            <Typography variant="h6">Users</Typography>
            <Typography variant="h4">{stats.users}</Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default DashboardPage;
