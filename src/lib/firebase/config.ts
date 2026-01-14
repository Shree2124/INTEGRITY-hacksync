import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";

// Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Validate Firebase configuration
const validateConfig = () => {
  const requiredKeys = [
    "NEXT_PUBLIC_FIREBASE_API_KEY",
    "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN",
    "NEXT_PUBLIC_FIREBASE_PROJECT_ID",
    "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET",
    "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID",
    "NEXT_PUBLIC_FIREBASE_APP_ID",
  ];

  const missingKeys = requiredKeys.filter(
    (key) =>
      !process.env[key] ||
      process.env[key] ===
        `your_${key.toLowerCase().replace("next_public_firebase_", "")}_here`
  );

  if (missingKeys.length > 0) {
    console.error(
      "Missing or invalid Firebase configuration. Please update your .env.local file with valid Firebase credentials."
    );
    console.error("Missing keys:", missingKeys.join(", "));
    return false;
  }

  return true;
};

// Initialize Firebase app (singleton pattern)
let app: FirebaseApp;
let auth: Auth;

if (typeof window !== "undefined") {
  // Only initialize on client side
  if (!getApps().length) {
    try {
      app = initializeApp(firebaseConfig);
      auth = getAuth(app);
    } catch (error) {
      console.log(error);
    }
  } else {
    app = getApps()[0];
    auth = getAuth(app);
  }
}

export { app, auth };
