import React, { useState } from "react";
import api from "../api/axios";

const Register = ({ setPage }) => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("user/register/", form);
      localStorage.setItem("access_token", res.data.access);
      localStorage.setItem("refresh_token", res.data.refresh);
      setPage("home");
    } catch (err) {
      const status = err.response?.status;
      const detail = err.response?.data;
      if (status === 500) {
        setError("Server error. Please try again.");
      } else if (typeof detail === "object" && detail !== null) {
        const firstErr = Object.values(detail).flat()[0];
        setError(firstErr || "Registration failed");
      } else {
        setError(detail || "Registration failed");
      }
    }
  };

  return (
    <div className="container py-12 max-w-md mx-auto">
      <div className="bg-white border border-shade-border rounded-lg p-8 shadow-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
        {error && (
          <div className="bg-red-50 text-red-600 px-4 py-2 rounded-md mb-4 text-sm">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-dark mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="w-full border border-shade-border rounded-md px-4 py-2 outline-none focus:border-primary"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-dark mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-shade-border rounded-md px-4 py-2 outline-none focus:border-primary"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-dark mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full border border-shade-border rounded-md px-4 py-2 outline-none focus:border-primary"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-md font-bold hover:bg-primary-dark transition-colors"
          >
            Create Account
          </button>
        </form>
        <p className="text-sm text-center text-secondary mt-4">
          Already have an account?{" "}
          <button
            onClick={() => setPage("login")}
            className="text-primary hover:underline font-medium"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
