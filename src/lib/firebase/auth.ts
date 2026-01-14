import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  sendPasswordResetEmail as firebaseSendPasswordResetEmail,
  sendEmailVerification as firebaseSendEmailVerification,
  updateProfile,
  User as FirebaseUser,
  onAuthStateChanged as firebaseOnAuthStateChanged,
} from 'firebase/auth';
import { auth } from './config';

// Error message mapping
export const getAuthErrorMessage = (errorCode: string): string => {
  const errorMessages: Record<string, string> = {
    'auth/email-already-in-use':
      'This email is already registered. Please login instead.',
    'auth/invalid-email': 'Invalid email address format.',
    'auth/weak-password': 'Password should be at least 8 characters long.',
    'auth/user-not-found': 'No account found with this email.',
    'auth/wrong-password': 'Incorrect password. Please try again.',
    'auth/invalid-credential': 'Invalid email or password.',
    'auth/too-many-requests': 'Too many failed attempts. Please try again later.',
    'auth/network-request-failed': 'Network error. Please check your connection.',
    'auth/popup-closed-by-user': 'Sign-in popup was closed. Please try again.',
    'auth/cancelled-popup-request': 'Only one popup request is allowed at a time.',
    'auth/popup-blocked': 'Sign-in popup was blocked by your browser. Please enable popups.',
    'auth/user-disabled': 'This account has been disabled.',
    'auth/operation-not-allowed': 'This sign-in method is not enabled.',
  };

  return (
    errorMessages[errorCode] ||
    'An error occurred during authentication. Please try again.'
  );
};

/**
 * Sign up with email and password
 * Creates a new user account and sends email verification
 */
export const signUpWithEmail = async (
  email: string,
  password: string,
  displayName: string
): Promise<FirebaseUser> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Update user profile with display name
    await updateProfile(user, {
      displayName: displayName,
    });

    // Send email verification
    await firebaseSendEmailVerification(user);

    return user;
  } catch (error: any) {
    const errorMessage = getAuthErrorMessage(error.code);
    throw new Error(errorMessage);
  }
};

/**
 * Sign in with email and password
 */
export const signInWithEmail = async (
  email: string,
  password: string
): Promise<FirebaseUser> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error: any) {
    const errorMessage = getAuthErrorMessage(error.code);
    throw new Error(errorMessage);
  }
};

/**
 * Sign in with Google OAuth
 * Opens popup for Google authentication
 */
export const signInWithGoogle = async (): Promise<FirebaseUser> => {
  try {
    const provider = new GoogleAuthProvider();
    // Optional: Add custom parameters
    provider.setCustomParameters({
      prompt: 'select_account',
    });

    const userCredential = await signInWithPopup(auth, provider);
    return userCredential.user;
  } catch (error: any) {
    const errorMessage = getAuthErrorMessage(error.code);
    throw new Error(errorMessage);
  }
};

/**
 * Sign out the current user
 */
export const signOutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error: any) {
    console.error('Error signing out:', error);
    throw new Error('Failed to sign out. Please try again.');
  }
};

/**
 * Send password reset email
 */
export const sendPasswordResetEmail = async (email: string): Promise<void> => {
  try {
    await firebaseSendPasswordResetEmail(auth, email);
  } catch (error: any) {
    const errorMessage = getAuthErrorMessage(error.code);
    throw new Error(errorMessage);
  }
};

/**
 * Send email verification to current user
 */
export const sendEmailVerification = async (user: FirebaseUser): Promise<void> => {
  try {
    await firebaseSendEmailVerification(user);
  } catch (error: any) {
    console.error('Error sending verification email:', error);
    throw new Error('Failed to send verification email. Please try again.');
  }
};

/**
 * Subscribe to auth state changes
 * Returns unsubscribe function
 */
export const onAuthStateChanged = (callback: (user: FirebaseUser | null) => void) => {
  return firebaseOnAuthStateChanged(auth, callback);
};

/**
 * Get current user
 */
export const getCurrentUser = (): FirebaseUser | null => {
  return auth.currentUser;
};

/**
 * Check if credentials match admin credentials
 */
export const isAdminCredentials = (email: string, password: string): boolean => {
  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
  const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

  return email === adminEmail && password === adminPassword;
};

/**
 * Sign in as admin with hardcoded credentials
 * Returns a mock user object for admin
 */
export const signInAsAdmin = (email: string, password: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    if (isAdminCredentials(email, password)) {
      // Create a mock user object for admin
      const adminUser = {
        uid: 'admin-super-user',
        email: email,
        displayName: 'Super Admin',
        emailVerified: true,
        photoURL: null,
        isAdmin: true,
      };
      resolve(adminUser);
    } else {
      reject(new Error('Invalid admin credentials'));
    }
  });
};
