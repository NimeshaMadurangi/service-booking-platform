const express = require("express")
const http = require("http")
const { Server } = require("socket.io")
const cors = require("cors")
const dotenv = require("dotenv")
const connectDB = require("./config/db")

dotenv.config()
connectDB()

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: { origin: "http://localhost:3000", methods: ["GET", "POST"] },
})

// Middlewares
app.use(cors())
app.use(express.json())

// Routes
app.use("/api/auth", require("./routes/authRoutes"))
app.use("/api/services", require("./routes/serviceRoutes"))
app.use("/api/bookings", require("./routes/bookingRoutes"))
app.use("/api/messages", require("./routes/messageRoutes"))
app.use("/api/reviews", require("./routes/reviewRoutes"))

// Socket.io
require("./socket/socketHandler")(io)

// Health check
app.get("/", (req, res) =>
  res.json({ message: "✅ Service Booking API Running" }),
)

const PORT = process.env.PORT || 5000
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))
