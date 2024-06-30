// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA0jX30s_H3fVvrlTXkKYneGZZAicItr6Y",
  authDomain: "next-ecommerce-e9bd1.firebaseapp.com",
  projectId: "next-ecommerce-e9bd1",
  storageBucket: "next-ecommerce-e9bd1.appspot.com",
  messagingSenderId: "977778755817",
  appId: "1:977778755817:web:24f774eeab06283ba18878",
  measurementId: "G-J4C2MMD0Q7"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);

export default firebaseApp;