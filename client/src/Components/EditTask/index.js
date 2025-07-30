import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditTask() {
  const [task, setTask] = useState({
    title: "", description: "", date: "", startTime: "", endTime: "", category: "", status: "pending"
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/tasks", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const single = res.data.find((t) => t._id === id);
      setTask(single);
    };
    fetchTask();
  }, [id]);

  const handleChange = (e) => setTask({ ...task, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    await axios.put(`http://localhost:5000/api/tasks/${id}`, task, {
      headers: { Authorization: `Bearer ${token}` }
    });
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-purple-100 flex justify-center items-start pt-10 px-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-purple-600 mb-4 text-center">✏️ Edit Task</h2>
        <input name="title" value={task.title} onChange={handleChange} className="w-full p-2 mb-3 border rounded" />
        <textarea name="description" value={task.description} onChange={handleChange} className="w-full p-2 mb-3 border rounded" />
        <input type="date" name="date" value={task.date?.split("T")[0]} onChange={handleChange} className="w-full p-2 mb-3 border rounded" />
        <div className="flex gap-2 mb-3">
          <input type="time" name="startTime" value={task.startTime} onChange={handleChange} className="w-1/2 p-2 border rounded" />
          <input type="time" name="endTime" value={task.endTime} onChange={handleChange} className="w-1/2 p-2 border rounded" />
        </div>
        <select name="category" value={task.category} onChange={handleChange} className="w-full p-2 mb-3 border rounded">
          <option>UI/UX</option><option>Front-End</option><option>Back-End</option><option>Meeting</option>
        </select>
        <select name="status" value={task.status} onChange={handleChange} className="w-full p-2 mb-3 border rounded">
          <option value="pending">Pending</option>
          <option value="in-progress">In-Progress</option>
          <option value="completed">Completed</option>
        </select>
        <button type="submit" className="bg-purple-600 text-white w-full py-2 rounded">Update Task</button>
      </form>
    </div>
  );
}

export default EditTask;
