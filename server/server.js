// server/server.js (CommonJS)
// -------------------------------------------------
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");

const { connectDB } = require("./config/db.js");
const { notFound, errorHandler } = require("./middleware/errorHandler.js");

// Routes
const authRoutes = require("./routes/authRoutes.js");
const agentRoutes = require("./routes/agentRoutes.js");
const uploadRoutes = require("./routes/uploadRoutes.js");

// Models
const User = require("./models/User.js");

// Load env
dotenv.config();

const app = express();

// CORS
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
    credentials: true,
  })
);

// Body parsing + logs
app.use(express.json());
app.use(morgan("dev"));

// Health checks
app.get("/", (_req, res) => res.send("API running"));
app.get("/health", (_req, res) => res.json({ ok: true }));

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/agents", agentRoutes);
app.use("/api/upload", uploadRoutes);

// 404 + error handler
app.use(notFound);
app.use(errorHandler);

// Bootstrap server
const start = async () => {
  try {
    const mongo = process.env.MONGO_URI;
    if (!mongo) throw new Error("MONGO_URI missing in .env");
    await connectDB(mongo);

    // Seed default admin if provided
    const adminEmail = (process.env.ADMIN_EMAIL || "").toLowerCase();
    const adminPassword = process.env.ADMIN_PASSWORD || "Admin@123";
    if (adminEmail) {
      const existing = await User.findOne({ email: adminEmail });
      if (!existing) {
  await User.create({
    name: "Admin",              // ← add this
    email: adminEmail,
    password: adminPassword,
  });
  console.log(`✅ Seeded default admin: ${adminEmail}`);
}

    }

    const port = Number(process.env.PORT) || 5000;
    app.listen(port, () => console.log(`✅ Server listening on :${port}`));
  } catch (err) {
    console.error("❌ Server start failed:", err.message);
    process.exit(1);
  }
};

start();
