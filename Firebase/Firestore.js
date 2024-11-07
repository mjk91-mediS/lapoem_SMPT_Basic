// 사용자 앱에서 FCM 토큰을 Firestore에 저장하는 코드
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/messaging';

const db = firebase.firestore();
const messaging = firebase.messaging();

async function saveUserNotificationPreferences(userId, email, isNotified) {
  try {
    const fcmToken = await messaging.getToken();

    // Firestore에 사용자 정보 저장
    await db.collection('users').doc(userId).set({
      email: email,
      is_notified: isNotified,
      fcm_token: fcmToken,
    });
    console.log('User notification preferences saved.');
  } catch (error) {
    console.error('Error saving notification preferences:', error);
  }
}
