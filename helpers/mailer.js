require("dotenv").config();
const nodemailer = require("nodemailer");
const { getMaxListeners } = require("../models/usersmodel");
const sendEmail = async (email,code) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASS,
      },
    });
    const info = await transporter.sendMail({
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: "Verify your email",
      text: `Your one time password`,
      html: `<p><b> your one time password is : </b><p><b>${code} 
      </b> Enter this otp to validate your account.</p>`,
    });
    return info.messageId;
  }catch (error) {
    return error.message;
  }
};

module.exports = { sendEmail };