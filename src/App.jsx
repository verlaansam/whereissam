import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import HomePage from "./pages/Home";
import Navbar from "./components/Navbar";
import Blogs from "./pages/Blogs";
import Footer from "./components/Footer";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/blog" element={<Blogs />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
        <Footer/>
      </Router>
    </AuthProvider>
  );
};

export default App;