require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/send-email', (req, res) => {
  const { email, name, subject, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
      user: process.env.USER, 
      pass: process.env.PASS, 
    },
  });

  const mailOptions = {
    from: email,
    to: process.env.USER, 
    subject: subject,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).json({ message: 'Email sent successfully!' });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
