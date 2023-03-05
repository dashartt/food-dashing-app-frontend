// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyCiSP4twEWcChk3Fh5cWFTqVu6ABxTJZUA",
  authDomain: "macacoloucopizzaria-backend.firebaseapp.com",
  projectId: "macacoloucopizzaria-backend",
  storageBucket: "macacoloucopizzaria-backend.appspot.com",
  messagingSenderId: "158880334574",
  appId: "1:158880334574:web:b482631e0a915cb1bd69ff",
  measurementId: "G-PH5K8QCH4R",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
