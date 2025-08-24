const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");

// Load environment variables
dotenv.config();

// Validate required environment variables
if (!process.env.DB_URL) {
  console.error("DB_URL environment variable is required");
  process.exit(1);
}

// Load passport configuration
require("./config/passport");

// Create Express application
const app = express();

// CORS configuration
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
}));

app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());

// Session management
app.use(session({
  secret: process.env.SESSION_SECRET || "your-session-secret-change-in-production",
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Route imports
const responseRouter = require("./routers/responseRouter");
const ticketTypeRouter = require("./routers/ticketTypeRouter");
const userRouter = require("./routers/userRouter");
const authRouter = require("./routers/authRouter");
const emailRouter = require("./routers/emailRouter");
const categoryRouter = require("./routers/categoryRouter");
const ticketRouter = require("./routers/ticketRouter");

// API routes with normalized naming
app.use("/api/users", userRouter);
app.use("/api/responses", responseRouter);
app.use("/api/ticket-types", ticketTypeRouter);
app.use("/api/auth", authRouter);
app.use("/api/email", emailRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/tickets", ticketRouter);

// Legacy routes for backward compatibility (consider removing after migration)
app.use("/api/user", userRouter);
app.use("/response", responseRouter);
app.use("/TicketType", ticketTypeRouter);
app.use("/auth", authRouter);
app.use("/Email", emailRouter);
app.use("/Categories", categoryRouter);
app.use("/Ticket", ticketRouter);

app.get("/", (req, res) => res.json({ 
  message: "FixItNow API Server is running",
  version: "1.0.0",
  timestamp: new Date().toISOString()
}));

// Handle undefined routes
app.all('*', (req, res, next) => {
  const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  err.status = 'fail';
  err.statusCode = 404;
  next(err);
});

// Global error handling middleware
const globalErrorHandler = require('./middleware/errorHandler');
app.use(globalErrorHandler);

// Database connection
mongoose.connect(process.env.DB_URL)
  .then(() => console.log(`Connected to MongoDB at ${new Date().toISOString()}`))
  .catch(err => {
    console.error(`MongoDB connection failed: ${err.message}`);
    process.exit(1);
  });

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📅 Started at ${new Date().toISOString()}`);
});
