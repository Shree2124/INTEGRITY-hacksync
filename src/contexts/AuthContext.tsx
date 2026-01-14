'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User as FirebaseUser } from 'firebase/auth';
import { User } from '@/types/types';
import {
  signUpWithEmail as firebaseSignUp,
  signInWithEmail as firebaseSignIn,
  signInWithGoogle as firebaseSignInWithGoogle,
  signOutUser,
  sendPasswordResetEmail as firebaseSendPasswordResetEmail,
  sendEmailVerification,
  onAuthStateChanged,
  getCurrentUser,
} from '@/lib/firebase/auth';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  emailVerified: boolean;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  resendVerification: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [emailVerified, setEmailVerified] = useState<boolean>(false);

  // Transform Firebase User to app User type
  const transformFirebaseUser = (firebaseUser: FirebaseUser): User => {
    return {
      id: firebaseUser.uid,
      name: firebaseUser.displayName || 'User',
      email: firebaseUser.email || '',
      avatarUrl: firebaseUser.photoURL || undefined,
      role: 'Citizen', // Default role
    };
  };

  // Subscribe to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        setUser(transformFirebaseUser(firebaseUser));
        setEmailVerified(firebaseUser.emailVerified);
      } else {
        setUser(null);
        setEmailVerified(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Set session cookie when user changes
  useEffect(() => {
    if (user) {
      // Set session cookie for middleware
      const currentUser = getCurrentUser();
      if (currentUser) {
        currentUser.getIdToken().then((token) => {
          fetch('/api/auth/session', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token }),
          }).catch((err) => {
            console.error('Failed to set session cookie:', err);
          });
        });
      }
    } else {
      // Clear session cookie when logged out
      fetch('/api/auth/session', {
        method: 'DELETE',
      }).catch((err) => {
        console.error('Failed to clear session cookie:', err);
      });
    }
  }, [user]);

  const signUp = async (email: string, password: string, name: string) => {
    setLoading(true);
    setError(null);
    try {
      await firebaseSignUp(email, password, name);
      // User will be updated via onAuthStateChanged
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      await firebaseSignIn(email, password);
      // User will be updated via onAuthStateChanged
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    setError(null);
    try {
      await firebaseSignInWithGoogle();
      // User will be updated via onAuthStateChanged
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    setError(null);
    try {
      await signOutUser();
      // User will be cleared via onAuthStateChanged
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    setError(null);
    try {
      await firebaseSendPasswordResetEmail(email);
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const resendVerification = async () => {
    setError(null);
    try {
      const currentUser = getCurrentUser();
      if (!currentUser) {
        throw new Error('No user logged in');
      }
      await sendEmailVerification(currentUser);
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const clearError = () => {
    setError(null);
  };

  const value: AuthContextType = {
    user,
    loading,
    error,
    emailVerified,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    resetPassword,
    resendVerification,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
