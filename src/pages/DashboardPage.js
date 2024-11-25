import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Grid2 as Grid,
  Paper,
  Typography,
  Box,
  Button,
  CircularProgress,
} from "@mui/material";
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { AddCircleOutline, Book, Group, Receipt } from "@mui/icons-material";
import axios from "axios";

Chart.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const DashboardPage = () => {
  const chartRef = useRef(null);
  const [stats, setStats] = useState({
    books: 0,
    users: 0,
    rentals: 0,
    authors: 0,
  });
  const [loading, setLoading] = useState(true);

  const quickLinks = [
    { icon: <AddCircleOutline />, text: "Add Book", route: "/books/new" },
    { icon: <Book />, text: "Manage Books", route: "/books" },
    { icon: <Group />, text: "Manage Users", route: "/users" },
    { icon: <Receipt />, text: "View Rentals", route: "/rentals" },
  ];

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/library/stats`
        );
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching library stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const chartData = useMemo(
    () => ({
      labels: ["Books", "Users", "Rentals", "Authors"],
      datasets: [
        {
          label: "Library Stats",
          data: [stats.books, stats.users, stats.rentals, stats.authors],
          backgroundColor: ["#3f51b5", "#ff5722", "#009688", "#fbc02d"],
        },
      ],
    }),
    [stats]
  );

  useEffect(() => {
    const canvas = chartRef.current;
    let chartInstance;

    if (canvas) {
      const ctx = canvas.getContext("2d");

      if (canvas.chart) {
        canvas.chart.destroy();
      }

      chartInstance = new Chart(ctx, {
        type: "bar",
        data: chartData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: "top" },
            tooltip: { enabled: true },
          },
          scales: {
            x: { grid: { display: false } },
            y: { grid: { color: "#e0e0e0" } },
          },
        },
      });

      canvas.chart = chartInstance;
    }

    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [chartData]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          backgroundColor: "#f5f5f5",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 4, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Library Dashboard
      </Typography>

      {/* Stats Section */}
      <Grid container spacing={3} sx={{ marginBottom: 3 }}>
        {Object.entries(stats).map(([key, value], index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper
              sx={{
                padding: 2,
                textAlign: "center",
                backgroundColor: "#ffffff",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                borderLeft: `4px solid ${
                  ["#3f51b5", "#ff5722", "#009688", "#fbc02d"][index]
                }`,
              }}
            >
              <Typography
                variant="h6"
                color="textSecondary"
                gutterBottom
                sx={{ textTransform: "uppercase", fontWeight: "bold" }}
              >
                {key.toUpperCase()}
              </Typography>
              <Typography variant="h4" color="primary" fontWeight="bold">
                {value}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Chart Section */}
      <Paper
        sx={{
          padding: 3,
          marginBottom: 3,
          backgroundColor: "#ffffff",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Library Statistics
        </Typography>
        <Box sx={{ height: 300 }}>
          <canvas ref={chartRef} />
        </Box>
      </Paper>

      {/* Quick Links */}
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Quick Links
      </Typography>
      <Grid container spacing={3}>
        {quickLinks.map((link, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Button
              variant="contained"
              startIcon={link.icon}
              fullWidth
              sx={{
                padding: 2,
                justifyContent: "flex-start",
                backgroundColor: "#3f51b5",
                "&:hover": { backgroundColor: "#2c387e" },
              }}
              onClick={() => (window.location.href = link.route)}
            >
              {link.text}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DashboardPage;
