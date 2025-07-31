import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      // Use form.email and form.password
      const response = await axios.post("https://taskmanager6.onrender.com/api/auth/login", { 
        email: form.email, 
        password: form.password 
      });
      if (response && response.data) {
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard");
      } else {
        console.error("No data in response", response);
      }
    } catch (err) {
      console.error("Login error:", err);
      alert(err?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-200">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-xl font-bold mb-4 text-center">Login</h2>
        <input name="email" onChange={handleChange} placeholder="Email" className="mb-3 p-2 w-full border" />
        <input type="password" name="password" onChange={handleChange} placeholder="Password" className="mb-3 p-2 w-full border" />
        <button type="submit" className="bg-purple-600 text-white p-2 w-full">Login</button>
      </form>
    </div>
  );
}

export default Login;
