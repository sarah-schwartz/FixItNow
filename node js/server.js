const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");

// Load environment variables first
dotenv.config();

// Routers
const responseRouter = require("./routers/responseRouter");
const ticketTypeRouter = require("./routers/ticketTypeRouter");
const userRouter = require("./routers/userRouter");
const authRouter = require("./routers/authRouter");
const sendEmail = require("./routers/emailRouter");
const categoryRouter = require("./routers/categoryRouter");
const ticketRouter = require("./routers/ticketRouter");

const app = express();

// Middleware - סדר חשוב!
// 1. CORS צריך להיות ראשון
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
}));

// 2. Cookie parser לפני כל השאר
app.use(cookieParser());

// 3. Body parsers
app.use(express.json());
app.use(bodyParser.json());

// 4. Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'secretkey',
  resave: false,
  saveUninitialized: false, // שינוי ל-false
  cookie: { 
    secure: false, // בייצור: true (אם HTTPS)
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 1 day
  }
}));

// 5. Passport initialization
app.use(passport.initialize());
app.use(passport.session());

// Load passport configuration
require("./config/passport");

// DB connection
mongoose.connect(process.env.DB_URL)
  .then(() => console.log("Connected to MongoDB…"))
  .catch(err => console.error("Connection failed…", err));

// Routes
app.use("/api/user", userRouter);
app.use("/response", responseRouter);
app.use("/TicketType", ticketTypeRouter);
app.use("/auth", authRouter);
app.use("/Email", sendEmail);
app.use("/Categories", categoryRouter);
app.use("/Ticket", ticketRouter);

// Remove duplicate user route
// app.use("/User", userRouter); // ← הסר את זה

// Test route
app.get("/", (req, res) => res.send("Server is running"));

// Start server
const port = process.env.PORT || 8080;
app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);