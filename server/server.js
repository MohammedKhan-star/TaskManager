const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();



const app = express();

app.use(cors());
app.use(express.json());

//router
app.get("/", (req, res) => {
    res.send("API is running...");
})

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("MongoDB connection error:", err);
}
);
const authRoutes = require("./routes/auth");

app.use("/api/auth", authRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});

const taskRoutes = require("./routes/tasks");

app.use("/api/tasks", taskRoutes);
