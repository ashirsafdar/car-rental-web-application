import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAppContext();
  const [form, setForm] = useState({ email: "user@example.com", password: "demo1234" });
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.email || !form.password) {
      setError("Please enter both your email and password.");
      return;
    }

    const user = {
      email: form.email.trim(),
      name: form.email.includes("@") ? form.email.split("@")[0] : "User",
    };

    login(user);
    navigate("/listing");
  };

  return (
    <main className="auth-page">
      <div className="auth-card">
        <p className="eyebrow auth-eyebrow">WELCOME BACK</p>
        <h1>Login to Rentroo</h1>
        <p className="auth-subtitle">Frontend demo only — no real backend authentication is connected.</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <label>
            <span>Email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="user@example.com"
            />
          </label>

          <label>
            <span>Password</span>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter password"
            />
          </label>

          {error ? <p className="auth-error">{error}</p> : null}

          <button type="submit" className="primary-button">Login</button>
        </form>
      </div>
    </main>
  );
};

export default LoginPage;
