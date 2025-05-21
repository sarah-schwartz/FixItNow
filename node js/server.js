// const express = require("express");
// const bodyParser = require("body-parser");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const mongoose = require("mongoose");
// const passport = require("passport");
// const session = require("express-session"); // משתמשים ב-express-session במקום cookie-session

// // התחברות לקובץ סיסמאות
// dotenv.config();

// // יצירת האפליקציה
// const app = express();
// app.use(express.json());

// // קונפיגורציה ל־passport
// require("./config/passport");

// app.use(cors());
// app.use(bodyParser.json());

// // משתמשים ב-express-session במקום cookie-session
// app.use(session({
//   secret: 'secretkey', // מפתח הצפנה (מומלץ לשנות אותו ליותר מאובטח בסביבה אמיתית)
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: false } // אם יש שימוש ב-HTTPS, יש לשנות ל-true
// }));

// app.use(passport.initialize());
// app.use(passport.session());

// // התחברות למסד נתונים
// mongoose.connect(process.env.DB_URL)
//   .then(() => console.log("Connected…"))
//   .catch(err => console.error("Connection failed…"));

// // ראוטים
// const responseRouter = require("./routers/responseRouter");
// const ticketTypeRouter = require("./routers/ticketTypeRouter");
// const userRouter = require("./routers/userRouter");
// const authRouter = require("./routers/authRouter");

// app.use("/response", responseRouter);
// app.use("/TicketType", ticketTypeRouter);
// app.use("/User", userRouter);
// app.use("/auth", authRouter); // ראוט של התחברות רגילה + גוגל
// app.get("/", (req, res) => res.send("Server is running"));

// app.listen(process.env.PORT, () =>
//   console.log(`Server running on http://localhost:${process.env.PORT}`)
// );


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

// ראוטים
app.use("/response", responseRouter);
app.use("/TicketType", ticketTypeRouter);
app.use("/User", userRouter);
app.use("/auth", authRouter);
app.use("/Email", sendEmail);

app.get("/", (req, res) => res.send("Server is running"));

app.listen(process.env.PORT, () =>
  console.log(`Server running on http://localhost:${process.env.PORT}`)
);
