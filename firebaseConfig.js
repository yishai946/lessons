import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDqqv1C8pIsbAapYJCfHDI7tiDeU1PiXSo",
  authDomain: "lessons-bcbb6.firebaseapp.com",
  projectId: "lessons-bcbb6",
  storageBucket: "lessons-bcbb6.appspot.com",
  messagingSenderId: "37663628436",
  appId: "1:37663628436:web:0bccc242c065e492c0a881",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export default { auth };
