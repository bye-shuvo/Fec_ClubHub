import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signOut,
  signInWithPopup,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_apiKey,
  authDomain: import.meta.env.VITE_FIREBASE_authDomain,
  projectId: import.meta.env.VITE_FIREBASE_projectId,
  storageBucket: import.meta.env.VITE_FIREBASE_storageBucket,
  messagingSenderId: import.meta.env.VITE_FIREBASE_messagingSenderId,
  appId: import.meta.env.VITE_FIREBASE_appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth(app);
const signInWithGoogle = () => signInWithPopup(auth, provider);;
const signOutUser = () => signOut(auth);

export { signInWithGoogle };
export { signOutUser };
export { auth };
