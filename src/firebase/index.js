import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAPpXwlEC2gxidiytOdHOnjCMeet0kjukI",
  authDomain: "v-app-29356.firebaseapp.com",
  projectId: "v-app-29356",
  storageBucket: "v-app-29356.appspot.com",
  messagingSenderId: "742672094917",
  appId: "1:742672094917:web:b2dc641497e89aff1c82ac",
};

// Initialize Firebase
export const initFirebase = () => {
  initializeApp(firebaseConfig);
};

export default {};
