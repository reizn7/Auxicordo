import React, { useState } from "react";
import './Login.css'; 

const Login = ({ showAlert }) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!credentials.email || !credentials.password) {
      showAlert("Please fill in all fields", "warning");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password
        })
      });

   
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Invalid server response (not JSON)");
      }

      const json = await response.json();
      console.log(json);

      if (response.ok && json.authToken) {
        localStorage.setItem("token", json.authToken);
        showAlert("Logged in successfully!", "success");
        
      } else {
        showAlert(json.error || "Invalid credentials", "danger");
      }
    } catch (error) {
      console.error("Login error:", error);
      showAlert("Something went wrong. Please try again.", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="login-container">
      <h2 className="login-heading">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group my-2">
          <label htmlFor="email" id="op">Email Address</label>
          <input
            type="email"
            name="email"
            value={credentials.email}
            onChange={onChange}
            className="form-control"
            id="email"
            placeholder="Enter email"
            required
          />
        </div>

        <div className="form-group my-2">
          <label htmlFor="password" id="op2">Password</label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={onChange}
            className="form-control"
            id="password"
            placeholder="Password"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary my-3">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
