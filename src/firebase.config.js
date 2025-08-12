import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyBBg6PEI_JSEFh2XffHHA6ZjRpzcxKaKAQ",
  authDomain: "note-app-51ef3.firebaseapp.com",
  projectId: "note-app-51ef3",
  storageBucket: "note-app-51ef3.firebasestorage.app",
  messagingSenderId: "677643496714",
  appId: "1:677643496714:web:1f809c4a07f4b17a029ef3",
  measurementId: "G-WEPJHCHK95"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app