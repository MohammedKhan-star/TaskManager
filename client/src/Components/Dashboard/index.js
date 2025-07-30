import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./index.css"; // Assuming you have a CSS file for styles

function Dashboard() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    startTime: "",
    endTime: "",
    category: "",
  });

  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const fetchTasks = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("https://taskmanager6.onrender.com/api/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await axios.post("https://taskmanager6.onrender.com/api/tasks", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Task Created!");
      setForm({
        title: "",
        description: "",
        date: "",
        startTime: "",
        endTime: "",
        category: "",
      });
      fetchTasks(); // Refresh task list
    } catch (err) {
      alert("Error creating task");
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`https://taskmanager6.onrender.com/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks(); // Refresh task list
    } catch (err) {
      alert("Error deleting task");
    }
  };

  return (
    <>
      {/* Create Task Form */}
      <div className="min-h-screen bg-purple-50 flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full"
        >
          <h2 className="text-2xl font-bold text-purple-700 mb-6 text-center">
            ✍️ Create New Task
          </h2>

          <input
            type="text"
            name="title"
            placeholder="Task Title"
            value={form.title}
            onChange={handleChange}
            className="w-full p-3 mb-4 border border-purple-200 rounded"
            required
          />

          <textarea
            name="description"
            placeholder="Task Description"
            value={form.description}
            onChange={handleChange}
            className="w-full p-3 mb-4 border border-purple-200 rounded"
          />

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full p-3 mb-4 border border-purple-200 rounded"
            required
          />

          <div className="flex gap-4 mb-4">
            <input
              type="time"
              name="startTime"
              value={form.startTime}
              onChange={handleChange}
              className="w-1/2 p-3 border border-purple-200 rounded"
              required
            />
            <input
              type="time"
              name="endTime"
              value={form.endTime}
              onChange={handleChange}
              className="w-1/2 p-3 border border-purple-200 rounded"
              required
            />
          </div>

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full p-3 mb-4 border border-purple-200 rounded"
            required
          >
            <option value="">Select Category</option>
            <option value="Design">🎨 Design</option>
            <option value="Meeting">👥 Meeting</option>
            <option value="Coding">💻 Coding</option>
            <option value="Research">🔍 Research</option>
          </select>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded hover:bg-purple-700"
          >
            ➕ Add Task
          </button>
        </form>
      </div>

      {/* Task List */}
      <div className="min-h-screen bg-purple-50 px-4 py-6">
        <h1 className="text-3xl font-bold text-purple-700 mb-8 text-center">📋 My Task List</h1>

        {tasks.length === 0 ? (
          <p className="text-center text-gray-500">No tasks found. Add one!</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map((task) => (
              <div
                key={task._id}
                className="bg-white rounded-xl shadow-md p-5 border-l-4 border-purple-500 hover:shadow-lg transition-transform duration-200 hover:scale-105"
              >
                <h2 className="text-xl font-bold text-purple-700 mb-1">{task.title}</h2>
                <p className="text-gray-600 text-sm mb-2">{task.description}</p>
                <div className="text-sm flex justify-between text-gray-500 mb-1">
                  <span>📅 {new Date(task.date).toDateString()}</span>
                  <span>⏰ {task.startTime} - {task.endTime}</span>
                </div>
                <div className="text-sm">
                  <span className="inline-block bg-purple-100 text-purple-600 font-semibold px-3 py-1 rounded-full">
                    📂 {task.category}
                  </span>
                </div>
                <div className="mt-4 flex justify-end gap-2">
                  <button
                    onClick={() => navigate(`/edit-task/${task._id}`)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white text-sm px-3 py-1 rounded"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Dashboard;
