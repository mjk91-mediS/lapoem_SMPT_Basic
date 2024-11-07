const db = require('../config/db');
const emailSender = require('../utils/emailSender');

function sendNewBookNotification() {
  const query =
    'SELECT user_id, user_email FROM users WHERE is_notified = TRUE';
  db.query(query, (err, users) => {
    if (err) {
      console.error('Error fetching users:', err);
      return;
    }

    const subject = '신간 도서가 등록되었습니다!';
    const body = '새로운 책이 등록되었습니다. 확인해보세요!';

    users.forEach((user) => {
      emailSender.sendEmail(user.user_email, subject, body);
    });
  });
}

module.exports = { sendNewBookNotification };
