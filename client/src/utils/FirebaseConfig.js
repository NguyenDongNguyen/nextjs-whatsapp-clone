import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDrbD6pluO9WS1GTFhaWfR6uZHOJVE8fL8',
  authDomain: 'whatsapp-clone-104d2.firebaseapp.com',
  projectId: 'whatsapp-clone-104d2',
  storageBucket: 'whatsapp-clone-104d2.firebasestorage.app',
  messagingSenderId: '439318777759',
  appId: '1:439318777759:web:6c0ef346e03f57d05737aa',
  measurementId: 'G-K84Q29LETG',
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
