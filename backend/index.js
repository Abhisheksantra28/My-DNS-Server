const express = require("express");
const connectDB = require("./src/config/connectDB.js");
const dnsRoutes = require("./src/routes/dnsRoutes.js");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// CORS configuration
const corsOptions = {
  origin: ["http://localhost:5173", "https://mydns.abhisheksantra.tech"], // Allow requests from this origin
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed methods
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// API Routes
app.use("/api", dnsRoutes);
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Welcome to DNS server",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);

// Start the DNS server
require("./dnsServer.js");
