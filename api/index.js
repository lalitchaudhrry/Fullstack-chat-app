const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const os = require("os");
require("dotenv").config();

const authRoutes = require("./routes/auth");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// 🔌 Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("✅ Connected to MongoDB");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });

// 📦 Auth Routes
app.use("/api/auth", authRoutes);

// ✅ Create HTTP & Socket.IO server
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// ⚡️ Socket.IO Logic
io.on("connection", (socket) => {
  console.log("🔗 A user connected:", socket.id);

  socket.on("send_message", (data) => {
    console.log("📨 Message received:", data);
    socket.broadcast.emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});
let onlineUsers = new Set();

io.on("connection", (socket) => {
  onlineUsers.add(socket.id);
  io.emit("online_users", Array.from(onlineUsers));

  socket.on("disconnect", () => {
    onlineUsers.delete(socket.id);
    io.emit("online_users", Array.from(onlineUsers));
  });
});


// 🌐 Helper function to get local IP
function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === "IPv4" && !iface.internal) {
        return iface.address;
      }
    }
  }
  return "localhost";
}

const PORT = 5000;
const HOST = "0.0.0.0";

// Add this line before server.listen()
app.get("/", (req, res) => {
  res.send("Server is running!");
});

server.listen(PORT, HOST, () => {
  const localIP = getLocalIP();
  console.log("🚀 Server running!");
  console.log(`🔗 Local:     http://localhost:${PORT}`);
  console.log(`📡 Network:   http://${localIP}:${PORT}`);
});
