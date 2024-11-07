import firebase from 'firebase/app';
import 'firebase/firestore';

const db = firebase.firestore();

async function registerNewBook(title, author) {
  try {
    await db.collection('books').add({
      title: title,
      author: author,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    console.log('New book registered!');
  } catch (error) {
    console.error('Error registering new book:', error);
  }
}
