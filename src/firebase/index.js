import { initializeApp } from "firebase/app";
import {
  getMessaging,
  isSupported,
  getToken,
  onMessage,
} from "firebase/messaging";
import { appInfo } from "../stores/index";

const vapidKey =
  "BMvqTbOYx0np9__r5J0Dlg7WlXDcZ6QnkWfh1H2_91AT1MRDwRnsUcChpbGDfKLb0SAj35zwr7Zd5BDrJigjZvY";

const firebaseConfig = {
  apiKey: "AIzaSyAPpXwlEC2gxidiytOdHOnjCMeet0kjukI",
  authDomain: "v-app-29356.firebaseapp.com",
  projectId: "v-app-29356",
  storageBucket: "v-app-29356.appspot.com",
  messagingSenderId: "742672094917",
  appId: "1:742672094917:web:b2dc641497e89aff1c82ac",
};

function requestPermission() {
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
  const messaging = async () => (await isSupported()) && getMessaging(app);
  const msg = await messaging();

  await requestPermission();

  getToken(msg, {
    vapidKey: vapidKey,
  }).then((currentToken) => {
    appInfo.value.FirebaseCloudMessageToken = currentToken;

    console.log(msg);
  });

  onMessage(msg, (message) => {
    console.log(
      "New foreground notification from Firebase Messaging!",
      message.notification
    );
    new Notification(message.notification.title, {
      body: message.notification.body,
    });
    appInfo.value.onMessage = message;
  });
};

export default {};
