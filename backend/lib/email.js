const nodemailer = require("nodemailer");
require('dotenv').config()

const sendVerificationEmail = async (email, subject, text) => {
    //create a nodemailer transporter
  
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "ifenowoifesegun@gmail.com",
        pass: process.env.APP_PASSWORD,
      },
    });
  
    //compose the email message
    const mailOptions = {
      from: "{finsweet.com",
      to: email,
      subject: `${subject}`,
      text: `${text}`,
    };
  
    try {
      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.log("error sending email", error);
    }
};

module.exports = sendVerificationEmail