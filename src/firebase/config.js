// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
import { getEnvironments } from "../helpers";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const {
  VITE_APIKEY,
  VITE_AUTHDOMAIN,
  VITE_PROJECTID,
  VITE_STORAGEBUCKET,
  VITE_MESSAGINGSENDERID,
  VITE_APPID,
} = getEnvironments();
// console.log(env)
// console.log(import.meta.env);

// Your web app's Firebase configuration
// DEV
// const firebaseConfig = {
//   apiKey: "AIzaSyCATBLQIv9u-VDuQlXeiFrB8B1HK0_Ah-E",
//   authDomain: "react-cursos-ad8af.firebaseapp.com",
//   projectId: "react-cursos-ad8af",
//   storageBucket: "react-cursos-ad8af.appspot.com",
//   messagingSenderId: "463564494986",
//   appId: "1:463564494986:web:f56cadc9356dfb701c3573"
// };

//TESTING
const firebaseConfig = {
  apiKey: VITE_APIKEY,
  authDomain: VITE_AUTHDOMAIN,
  projectId: VITE_PROJECTID,
  storageBucket: VITE_STORAGEBUCKET,
  messagingSenderId: VITE_MESSAGINGSENDERID,
  appId: VITE_APPID,
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);