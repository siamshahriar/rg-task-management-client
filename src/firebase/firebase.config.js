// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// const firebaseConfig = {
//   apiKey: "AIzaSyBXP-qvZkqR6h281emfu9m08aebadWAt_g",
//   authDomain: "task-mng-system.firebaseapp.com",
//   projectId: "task-mng-system",
//   storageBucket: "task-mng-system.appspot.com",
//   messagingSenderId: "745416997492",
//   appId: "1:745416997492:web:4939fec1db20008778af21",
// };
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.VITE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_PROJECTID,
  storageBucket: import.meta.env.VITE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_APPID,
};

// console.log(process.env);

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
