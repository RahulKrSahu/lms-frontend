import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Button } from "@mui/material";
import UserList from "../components/Users/UserList";
import UserForm from "../components/Users/UserForm";

const UsersPage = () => {
  return (
    <div style={{ padding: "16px" }}>
      <h1>Users</h1>
      <Link to="/users/new" style={{ textDecoration: "none" }}>
        <Button
          variant="contained"
          color="primary"
          style={{ marginBottom: "16px" }}
        >
          Add New User
        </Button>
      </Link>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/new" element={<UserForm />} />
        <Route path="/edit/:id" element={<UserForm />} />
      </Routes>
    </div>
  );
};

export default UsersPage;
