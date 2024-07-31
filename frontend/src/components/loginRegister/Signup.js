import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/auth.services";
import { toast } from "react-toastify";
import "./Signup.css";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate(); // For navigation

  function validateForm() {
    return email.length > 5 && password.length > 5 && name.length > 1;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await AuthService.register(name, email, password);
      toast.success("Sign Up successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000); // Use react-router-dom for navigation
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message || "An error occurred.");
      } else {
        toast.error("An error occurred. Please try again.");
      }
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h1 className="card-title">Sign Up</h1>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="name" className="form-label">Name</label>
            <input 
              type="text" 
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)} 
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email address</label>
            <input 
              type="email" 
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input 
              type="password" 
              id="password"
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
            />
          </div>
          <button 
            type="submit" 
            className="signup-button"
            disabled={!validateForm() || isSubmitting}
          >
            {isSubmitting ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
        <a href="/login" className="login-link">
          Already have an account? Login
        </a>
      </div>
    </div>
  );
}
