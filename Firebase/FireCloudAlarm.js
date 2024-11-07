const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.sendNewBookNotification = functions.firestore
  .document('books/{bookId}') // 새 책이 등록될 때 실행됨
  .onCreate(async (snap, context) => {
    const newBook = snap.data();
    const usersRef = admin.firestore().collection('users');

    // 알림 동의한 사용자 조회
    const snapshot = await usersRef.where('is_notified', '==', true).get();
    const tokens = [];

    snapshot.forEach((doc) => {
      const user = doc.data();
      if (user.fcm_token) {
        tokens.push(user.fcm_token);
      }
    });

    if (tokens.length > 0) {
      const message = {
        notification: {
          title: '새로운 책이 등록되었습니다!',
          body: `신간 "${newBook.title}"이(가) 등록되었습니다. 확인해보세요!`,
        },
        tokens: tokens,
      };

      // FCM을 사용해 푸시 알림 발송
      try {
        const response = await admin.messaging().sendMulticast(message);
        console.log(response.successCount + ' messages were sent successfully');
      } catch (error) {
        console.error('Error sending notifications:', error);
      }
    }
  });
