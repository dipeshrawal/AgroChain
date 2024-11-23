import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(null); // For error messages
  const navigate = useNavigate(); // for navigation

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }), // Only email and password sent
      });

      if (response.ok) {
        const responseData = await response.json();
        const { token, role } = responseData;
        console.log(responseData, role);
        // Save token and role in local storage
        localStorage.setItem("token", token);
        localStorage.setItem("role", role); // Save role in localStorage

        alert("Login successful");

        // Navigate based on the role
        if (role === "customer") {
          navigate("/userDashboard"); // Redirect to customer dashboard
        } else if (role === "farmer") {
          navigate("/farmerdashboard"); // Redirect to farmer dashboard
        } else if (role === "retailer") {
          navigate("/retailer/dashboard"); // Redirect to retailer dashboard
        } else if (role === "distributor") {
          navigate("/distributordashboard"); // Redirect to distributor dashboard
        }
      } else {
        const errorData = await response.json();
        setError(errorData.message); // Show error message
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("An error occurred. Please try again.");
    }
  };

  const handleRegister = () => {
    navigate("/register"); // Navigate to Signup page
  };

  return (
    <div className="login-container">
      <div className="hamburger-icon" onClick={toggleSidebar}>
        &#9776; {/* Hamburger icon */}
      </div>
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className="login-box">
        <h2> Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="login-button">
            Login
          </button>
          <button
            type="button"
            className="register-button"
            onClick={handleRegister}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
