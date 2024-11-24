import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "../../services/userService";

const UserActions = ({ userId }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/users/edit/${userId}`);
  };

  const handleDelete = async () => {
    try {
      await deleteUser(userId);
      navigate("/users");
    } catch (error) {
      console.error("Error deleting user:", error);
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

export default UserActions;
