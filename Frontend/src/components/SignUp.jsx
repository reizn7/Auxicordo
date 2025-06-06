import React, { useState } from "react";
import './SignUp.css';

const Signup = ({ showAlert }) => {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/createuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
      });

      const data = await response.json();
      console.log(data);

      if (data.authToken) {
        showAlert("Account created successfully!", "success");
        // Optionally redirect to login or home
      } else {
        showAlert(data.error || "Unable to register", "danger");
      }
    } catch (err) {
      console.error("Signup failed:", err);
      showAlert("Internal Server Error", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="sign-container">
      <div className="sign-heading mt-4">
        <h2>Signup</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group my-2">
            <label htmlFor="name" id="op">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              placeholder="Enter your name"
              value={credentials.name}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group my-2">
            <label htmlFor="email" id="op">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="Enter email"
              value={credentials.email}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group my-2">
            <label htmlFor="password" id="op">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="Password"
              value={credentials.password}
              onChange={onChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary my-3">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
