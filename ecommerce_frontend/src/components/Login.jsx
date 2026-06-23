import React, { useState } from "react";
import api from "../api/axios";

const Login = ({ setPage }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("user/login/", { username, password });
      localStorage.setItem("access_token", res.data.access);
      localStorage.setItem("refresh_token", res.data.refresh);
      setPage("home");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="container py-12 max-w-md mx-auto">
      <div className="bg-white border border-shade-border rounded-lg p-8 shadow-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
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
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-shade-border rounded-md px-4 py-2 outline-none focus:border-primary"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-dark mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-shade-border rounded-md px-4 py-2 outline-none focus:border-primary"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-md font-bold hover:bg-primary-dark transition-colors"
          >
            Sign In
          </button>
        </form>
        <p className="text-sm text-center text-secondary mt-4">
          Don't have an account?{" "}
          <button
            onClick={() => setPage("register")}
            className="text-primary hover:underline font-medium"
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
