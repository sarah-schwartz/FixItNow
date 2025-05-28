const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
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

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
}));

app.use(cookieParser());

app.use(express.json());
app.use(bodyParser.json());

mongoose.connect(process.env.DB_URL)
  .then(() => console.log("Connected to MongoDB…"))
  .catch(err => console.error("Connection failed…", err));

app.use("/api/user", userRouter);
app.use("/response", responseRouter);
app.use("/TicketType", ticketTypeRouter);
app.use("/auth", authRouter);
app.use("/Email", sendEmail);
app.use("/Categories", categoryRouter);
app.use("/Ticket", ticketRouter);

app.get("/", (req, res) => res.send("Server is running"));

const port = process.env.PORT || 8080;
app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);
