import { initializeApp } from "firebase/app";
import { getAnalytics } from 'firebase/analytics'
import { getAuth, initializeAuth   } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getPerformance } from 'firebase/performance'
import { getStorage } from 'firebase/storage'
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAl0Zarkllq8e2cZ8LyGSCZq2bJj-8XqRI",
  authDomain: "gopizza-ca1d3.firebaseapp.com",
  projectId: "gopizza-ca1d3",
  storageBucket: "gopizza-ca1d3.appspot.com",
  messagingSenderId: "399365391252",
  appId: "1:399365391252:web:f3aa438b90e35fcac80581"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth()
const firestore = getFirestore(app)
const performance = getPerformance(app)
const storage = getStorage(app)

export {  auth, firestore, performance, storage }

