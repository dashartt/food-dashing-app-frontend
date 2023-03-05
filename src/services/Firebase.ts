// Import the functions you need from the SDKs you need
// import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCiSP4twEWcChk3Fh5cWFTqVu6ABxTJZUA",
  authDomain: "macacoloucopizzaria-backend.firebaseapp.com",
  projectId: "macacoloucopizzaria-backend",
  storageBucket: "macacoloucopizzaria-backend.appspot.com",
  messagingSenderId: "158880334574",
  appId: "1:158880334574:web:b482631e0a915cb1bd69ff",
  measurementId: "G-PH5K8QCH4R",
};

// Initialize Firebase
initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const messaging = getMessaging();

export const requestForToken = () => {
  return getToken(messaging, {
    vapidKey:
      "BEnLDvheg32R_WoBOxoeks5OAC2sMMPG2EghTuTw2_gINlNeQ_vLHBzkgra5XOAoPQR6hNlCLi0mIvQm5wHjaEk",
  })
    .then((currentToken) => currentToken)
    .catch((err) => err);
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("payload", payload);
      resolve(payload);
    });
  });
