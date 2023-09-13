importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

const firebaseConfig = {
  apiKey: "AIzaSyAPpXwlEC2gxidiytOdHOnjCMeet0kjukI",
  authDomain: "v-app-29356.firebaseapp.com",
  projectId: "v-app-29356",
  storageBucket: "v-app-29356.appspot.com",
  messagingSenderId: "742672094917",
  appId: "1:742672094917:web:b2dc641497e89aff1c82ac",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Received background message ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
