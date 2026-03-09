import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBm-y5nlEOAqxXgmzbOrIu3lV9fgkj-afc",
  authDomain: "king-b697f.firebaseapp.com",
  databaseURL: "https://king-b697f-default-rtdb.firebaseio.com",
  projectId: "king-b697f",
  storageBucket: "king-b697f.firebasestorage.app",
  messagingSenderId: "540783729630",
  appId: "1:540783729630:web:2fa3afd2453212bcd85b4f",
  measurementId: "G-LHV984RDYJ"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);
