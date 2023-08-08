import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyARZ-1OJF3XYlaHmNFDZcPc5xo7hsbeYWA",
  authDomain: "petwalks-9d853.firebaseapp.com",
  projectId: "petwalks-9d853",
  storageBucket: "petwalks-9d853.appspot.com",
  messagingSenderId: "119369842089",
  appId: "1:119369842089:web:b7016203c98688820418b8",
  measurementId: "G-KR4RCY0VRC",
};

export const firebase = initializeApp(firebaseConfig);
