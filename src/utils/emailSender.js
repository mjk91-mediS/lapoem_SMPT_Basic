const nodemailer = require('nodemailer');
require('dotenv').config();

// SMTP 트랜스포터 설정
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const { sendEmail } = require('./path/to/your/emailSender');

// 이메일 전송 예제
sendEmail('recipient@example.com', 'Test Subject', 'This is a test email');

// 이메일 전송 함수
function sendEmail(to, subject, text) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(`Error sending email to ${to}:`, error);
    } else {
      console.log(`Notification sent to ${to}: ${info.response}`);
    }
  });
}

module.exports = { sendEmail };
