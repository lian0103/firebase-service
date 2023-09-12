import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAPpXwlEC2gxidiytOdHOnjCMeet0kjukI",
  authDomain: "v-app-29356.firebaseapp.com",
  projectId: "v-app-29356",
  storageBucket: "v-app-29356.appspot.com",
  messagingSenderId: "742672094917",
  appId: "1:742672094917:web:b2dc641497e89aff1c82ac",
};

function requestPermission(message) {
  console.log("Requesting permission...");
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("Notification permission granted.");
      return true;
    }
  });
}

// Initialize Firebase
export const initFirebase = async () => {
  const app = initializeApp(firebaseConfig);
  const message = getMessaging(app);

  await requestPermission(message);

  getToken(message, {
    vapidKey:
      "BMvqTbOYx0np9__r5J0Dlg7WlXDcZ6QnkWfh1H2_91AT1MRDwRnsUcChpbGDfKLb0SAj35zwr7Zd5BDrJigjZvY",
  });
};

export default {};
