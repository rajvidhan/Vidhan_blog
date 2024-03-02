// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-7934d.firebaseapp.com",
  projectId: "mern-blog-7934d",
  storageBucket: "mern-blog-7934d.appspot.com",
  messagingSenderId: "927433937889",
  appId: "1:927433937889:web:2181382244bff600b778a0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

