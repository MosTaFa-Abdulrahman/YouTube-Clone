import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCSQhCgVTzzhdjDbHMRyZQYgIJytNQeT1A",
  authDomain: "video-6facb.firebaseapp.com",
  projectId: "video-6facb",
  storageBucket: "video-6facb.appspot.com",
  messagingSenderId: "604588653616",
  appId: "1:604588653616:web:986145a2bef53a9d8881f5",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;
