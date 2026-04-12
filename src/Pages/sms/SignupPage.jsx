import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/sms-login.css";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setLoading(true);
    const apiUrl = "http://localhost:4000";

    try {
      const res = await fetch(`${apiUrl}/api/sms/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          role: "student"
        })
      });

      const data = await res.json();
      if (res.ok) {
        navigate("/sms/login");
      } else {
        setError(data.message || "Signup failed");
      }
    } catch (err) {
      setError("Network error: Could not connect to backend");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sms-login-bg">
      <div className="sms-login-card">
        <h1 className="sms-login-title">ATech Skills</h1>
        <p className="sms-login-subtitle">Create Your Account</p>

        {error && <div className="sms-login-error">{error}</div>}

        <form className="sms-login-form" onSubmit={handleSubmit}>
          <div style={{ display: "flex", gap: "1rem" }}>
            <div className="sms-login-input-group" style={{ flex: 1 }}>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                className="sms-login-input"
                required
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="sms-login-input-group" style={{ flex: 1 }}>
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                className="sms-login-input"
                required
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="sms-login-input-group">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="sms-login-input"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="sms-login-input-group">
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              className="sms-login-input"
              required
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="sms-login-input-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="sms-login-input"
              required
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="sms-login-input-group">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="sms-login-input"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="sms-login-btn" disabled={loading}>
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <p className="sms-login-footer">
          Already have an account? <Link to="/sms/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
