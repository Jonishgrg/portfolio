const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "YOUR_EMAIL@gmail.com",   // your Gmail
        pass: "YOUR_APP_PASSWORD"       // Gmail App Password
      }
    });

    await transporter.sendMail({
      from: email,                  // visitor email
      to: "YOUR_EMAIL@gmail.com",   // your email
      subject: `Portfolio Message from ${name}`,
      text: message
    });

    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error });
  }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));