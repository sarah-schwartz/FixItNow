
const express = require('express');
const router = express.Router();
const { sendEmail } = require('../services/emailService');
const nodemailer = require('nodemailer');

router.post('/send-email', async (req, res) => {
  console.log("send")
  const { to, subject, text } = req.body;
  try {
    await sendEmail(to, subject, text);
    res.send({ success: true, message: "המייל נשלח בהצלחה!" });
  } catch (error) {
    res.status(500).send({ success: false, message: "אירעה שגיאה בשליחת המייל" });
  }
});
module.exports = router;