const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");

// טען משתנים מהסביבה
dotenv.config();

// ✅ טען את הגדרת האסטרטגיה של גוגל
require("./config/passport"); // שימי לב לשנות לנתיב המתאים

// יצירת אפליקציית אקספרס
const app = express();

// הגדרות CORS
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
}));

app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());

// ✅ ניהול סשן
app.use(session({
  secret: "your-session-secret", // שימי כאן משהו בטוח
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // שימי true רק אם את על HTTPS
}));

// ✅ הפעלת Passport
app.use(passport.initialize());
app.use(passport.session());

// ✅ מסלולים
const responseRouter = require("./routers/responseRouter");
const ticketTypeRouter = require("./routers/ticketTypeRouter");
const userRouter = require("./routers/userRouter");
const authRouter = require("./routers/authRouter"); // כאן כנראה נמצאים /auth/google וכו'
const sendEmail = require("./routers/emailRouter");
const categoryRouter = require("./routers/categoryRouter");
const ticketRouter = require("./routers/ticketRouter");

app.use("/api/user", userRouter);
app.use("/response", responseRouter);
app.use("/TicketType", ticketTypeRouter);
app.use("/auth", authRouter);
app.use("/Email", sendEmail);
app.use("/Categories", categoryRouter);
app.use("/Ticket", ticketRouter);

app.get("/", (req, res) => res.send("Server is running"));

// התחברות למסד נתונים
mongoose.connect(process.env.DB_URL)
  .then(() => console.log("Connected to MongoDB…"))
  .catch(err => console.error("Connection failed…", err));

// הפעלת השרת
const port = process.env.PORT || 8080;
app.listen(port, () =>
  console.log('Server running on http://localhost:${port}')
);
