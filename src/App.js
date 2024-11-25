import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import Navbar from "./components/Navbar";
import AuthorsPage from "./pages/AuthorsPage";
import BooksPage from "./pages/BooksPage";
import RentalsPage from "./pages/RentalsPage";
import UsersPage from "./pages/UsersPage";

const App = () => {
  return (
    <Router>
      <Navbar />
      <div style={{ marginTop: "16px" }}>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/authors/*" element={<AuthorsPage />} />
          <Route path="/books/*" element={<BooksPage />} />
          <Route path="/rentals/*" element={<RentalsPage />} />
          <Route path="/users/*" element={<UsersPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
