import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

// PostgreSQL Database Connection using Sequelize
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: "postgres",
  logging: false, // Disable SQL query logging
  port: process.env.DB_PORT,
  dialectOptions: {
    ssl: {
      require: true, // Required for Neon.tech
      rejectUnauthorized: false, // Prevents SSL errors
    },
  },
  pool: { // Connection pool for efficiency
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

// Function to test and establish database connection
const connectDB = async () => {
  try {
    await sequelize.authenticate(); // Verify connection
    console.log("✅ PostgreSQL Connected Successfully to Neon.tech");

    // Sync models without forcing, creating tables if they don’t exist
    await sequelize.sync();
    console.log("✅ Database models synced (tables created if needed)");
  } catch (error) {
    console.error("❌ PostgreSQL Connection Failed:", error.message);
    process.exit(1); // Exit process if connection fails
  }
};

// Call connectDB at startup
connectDB();

export { sequelize, connectDB };
