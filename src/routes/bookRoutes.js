const express = require('express');
const {
  sendNewBookNotification,
} = require('../controllers/notificationController');
const router = express.Router();

// 책 등록 API
router.post('/books', (req, res) => {
  // 책 등록 로직 (책 정보를 데이터베이스에 저장하는 코드 작성)

  // 신간 알림 발송 호출
  sendNewBookNotification();
  res.send('Book registered and notifications sent.');
});

module.exports = router;
