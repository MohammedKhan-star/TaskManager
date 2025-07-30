import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", form);
      navigate("/");
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-xl font-bold mb-4 text-center">Register</h2>
        <input name="name" onChange={handleChange} placeholder="Name" className="mb-3 p-2 w-full border" />
        <input name="email" onChange={handleChange} placeholder="Email" className="mb-3 p-2 w-full border" />
        <input type="password" name="password" onChange={handleChange} placeholder="Password" className="mb-3 p-2 w-full border" />
        <button type="submit" className="bg-purple-500 text-white p-2 w-full">Register</button>
      </form>
    </div>
  );
}

export default Register;
