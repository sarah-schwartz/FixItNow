const nodemailer = require('nodemailer'); 
require("dotenv").config()
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD
    }
  });
  async function sendEmail(to, subject, text) {
    const mailOptions = {
      from: process.env.EMAIL,
      to,
      subject,
      text
    };
  
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent: ' + info.response);
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }
  module.exports = {
    sendEmail,
  };

