import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { sequelize, connectDB } from "./DB/DBconnection.js";

// Load environment variables from .env file
dotenv.config();

// Import models to register them with Sequelize
import "./models/userModel.js";
import "./models/fileModel.js";
import "./models/exEmployeeModel.js"; // Register ExEmployee model
import "./models/payrollModel.js";    // Register Payroll model
import "./models/hrUsers.js";  

// Import API routes
import userRoutes from "./routes/userRoute.js";
import fileRoutes from "./routes/fileRoute.js";
import authRoutes from "./routes/authRoute.js";
import exEmployeeRoutes from "./routes/exEmployeeRoute.js"; // Ex-employee routes
import payrollRoutes from "./routes/payrollRoute.js";      // Payroll routes

// Initialize Express app
const app = express();

// Configure CORS (Cross-Origin Resource Sharing) options
const corsOptions = {
  origin: "https://tms-frontend-xi.vercel.app", // Allow requests from frontend
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"], // Allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

// Apply CORS middleware
app.use(cors(corsOptions)); // Enable CORS with specified options
app.options("*", cors(corsOptions)); // Handle preflight requests

// Middleware to parse request bodies
app.use(express.json({ limit: "50mb" }));  // Parse JSON bodies with a size limit
app.use(express.urlencoded({ limit: "50mb", extended: true })); // Parse URL-encoded bodies

// Register API routes
app.use("/api/users", userRoutes);         // User-related routes
app.use("/api/files", fileRoutes);         // File-related routes
app.use("/api/auth", authRoutes);          // Authentication routes
app.use("/api/exemployees", exEmployeeRoutes); // Ex-employee routes
app.use("/api/payrolls", payrollRoutes);   // Payroll routes

// Root endpoint (to check if the backend is running)
app.get("/", (req, res) => {
  res.send("MERN Backend with PostgreSQL is Running...");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  try {
    await connectDB(); // Connect to the PostgreSQL database
    console.log(`🚀 Server running on port ${PORT}`);
  } catch (error) {
    console.error("Failed to start server:", error);
  }
});