import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./index.css"; // Assuming you have a CSS file for styles


function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  const fetchTasks = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("http://localhost:5000/api/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(res.data);
    } catch (err) {
      alert("Failed to load tasks");
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure to delete this task?");
    if (!confirm) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks(); // Refresh the list
    } catch (err) {
      alert("Failed to delete");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 px-4 py-6">
      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-3xl font-extrabold text-purple-700 text-center mb-8"
      >
        📋 My Task Dashboard
      </motion.h1>

      {/* Ad banner */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-3 rounded-xl shadow-lg mb-6 text-center font-medium animate-pulse"
      >
        ✅ Stay focused & organized with ProjectWorks – Your personal task manager
      </motion.div>

      {/* Task List */}
      {tasks.length === 0 ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-gray-600"
        >
          No tasks found. Create one!
        </motion.p>
      ) : (
       <div className="task-card-grid">
  {tasks.map((task) => (
    <div key={task._id} className="task-card-glass">
      <div className="task-header">
        <h2>{task.title}</h2>
        <span className="task-category">📂 {task.category}</span>
      </div>

      <p className="task-description">{task.description}</p>

      <div className="task-info">
        <span>📅 {new Date(task.date).toDateString()}</span>
        <span>⏰ {task.startTime} - {task.endTime}</span>
      </div>

      <div className="task-actions">
        <button
          className="btn-edit"
          onClick={() => navigate(`/edit-task/${task._id}`)}
        >
          ✏️ Edit
        </button>
        <button
          className="btn-delete"
          onClick={() => handleDelete(task._id)}
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  ))}
</div>
        )}
        </div>
    );
}

export default Dashboard;
