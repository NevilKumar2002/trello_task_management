import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/auth.services";
import { toast } from "react-toastify";
import "./style.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate(); // For navigation

  // Check if user is already logged in
  // useEffect(() => {
  //   const user = localStorage.getItem("user");
  //   if (user) {
  //     navigate('/dashboard'); // Redirect to dashboard if user exists
  //   }
  // }, [navigate]);

  function validateForm() {
    return email.length > 5 && password.length > 5;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await AuthService.login(email, password);
      localStorage.setItem("user", JSON.stringify(response.data)); // Save user data to localStorage
      toast.success("Login successful! Redirecting...");
      navigate('/dashboard');
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
    <div className="login-container">
      <div className="login-card">
        <h1 className="card-title">Login</h1>
        <form noValidate onSubmit={handleSubmit} className="form">
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
            className="login-button"
            disabled={!validateForm() || isSubmitting}
          >
            {isSubmitting ? "Logging In..." : "Login"}
          </button>
        </form>
        <a href="/signup" className="signup-link">
          Don't have an account? Sign up
        </a>
      </div>
    </div>
  );
}
