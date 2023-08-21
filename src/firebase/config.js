// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCATBLQIv9u-VDuQlXeiFrB8B1HK0_Ah-E",
  authDomain: "react-cursos-ad8af.firebaseapp.com",
  projectId: "react-cursos-ad8af",
  storageBucket: "react-cursos-ad8af.appspot.com",
  messagingSenderId: "463564494986",
  appId: "1:463564494986:web:f56cadc9356dfb701c3573"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);