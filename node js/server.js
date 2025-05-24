
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");

const responseRouter = require("./routers/responseRouter");
const ticketTypeRouter = require("./routers/ticketTypeRouter");
const userRouter = require("./routers/userRouter");
const authRouter = require("./routers/authRouter");
const sendEmail = require("./routers/emailRouter");
const categoryRouter = require('./routers/categoryRouter');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use(session({
  secret: 'secretkey',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use(passport.initialize());
app.use(passport.session());

require("./config/passport");

mongoose.connect(process.env.DB_URL)
  .then(() => console.log("Connected…"))
  .catch(err => console.error("Connection failed…"));

app.use("/response", responseRouter);
app.use("/TicketType", ticketTypeRouter);
app.use("/User", userRouter);
app.use("/auth", authRouter);
app.use("/Email", sendEmail);
app.use('/Categories', categoryRouter);

app.get("/", (req, res) => res.send("Server is running"));

app.listen(process.env.PORT, () =>
  console.log(`Server running on http://localhost:${process.env.PORT}`)
);
