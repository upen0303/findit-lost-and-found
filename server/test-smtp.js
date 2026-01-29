// server/test-smtp.js
require('dotenv').config();
const nodemailer = require('nodemailer');

console.log('Starting SMTP test...');
console.log('Email user:', process.env.EMAIL_USER);
console.log('Email password length:', (process.env.EMAIL_PASSWORD || '').length);

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: (process.env.EMAIL_PASSWORD || '').replace(/\s/g, '')
  }
});

console.log('Transporter created. Verifying credentials...');

transporter.verify((err, success) => {
  if (err) {
    console.error('❌ SMTP verification failed:', err.message);
    process.exit(1);
  } else {
    console.log('✅ SMTP connection successful!');
    
    transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: 'FindIt Test Email',
      text: 'This is a test email from FindIt application.'
    }, (err, info) => {
      if (err) {
        console.error('❌ Email send failed:', err.message);
        process.exit(1);
      } else {
        console.log('✅ Email sent successfully!');
        console.log('Message ID:', info.messageId);
        process.exit(0);
      }
    });
  }
});