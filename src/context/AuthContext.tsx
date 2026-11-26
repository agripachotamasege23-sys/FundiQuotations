import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  AuthError,
  User,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db, googleProvider, PRIMARY_ADMIN_EMAIL } from '../lib/firebase';

interface AuthContextValue {
  user: User | null;
  authReady: boolean;
  isAdmin: boolean;
  checkingAdmin: boolean;
  authError: string | null;
  clearAuthError: () => void;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<boolean>;
  resetPassword: (email: string) => Promise<boolean>;
  resendVerificationEmail: () => Promise<boolean>;
  signOutUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function formatFirebaseAuthError(err: unknown): string {
  const code = (err as Partial<AuthError> | undefined)?.code;
  switch (code) {
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
      return 'Incorrect email or password. Please check your credentials and try again.';
    case 'auth/user-not-found':
      return 'No administrator account was found with that email address.';
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/missing-password':
      return 'Please enter your password.';
    case 'auth/user-disabled':
      return 'This account has been disabled in Firebase Authentication.';
    case 'auth/too-many-requests':
      return 'Too many failed sign-in attempts. Please wait a few minutes or reset your password.';
    case 'auth/operation-not-allowed':
      return 'Email/Password sign-in is not enabled yet in Firebase Console.';
    case 'auth/popup-closed-by-user':
      return 'Google sign-in window was closed before completing.';
    case 'auth/popup-blocked':
      return 'Sign-in popup was blocked by your browser. Please allow popups and try again.';
    case 'auth/network-request-failed':
      return 'Network error while contacting authentication service. Check your connection and retry.';
    default:
      return err instanceof Error ? err.message : 'Authentication failed. Please try again.';
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingAdmin, setCheckingAdmin] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setAuthError(null);

      if (!currentUser) {
        setIsAdmin(false);
        setAuthReady(true);
        setCheckingAdmin(false);
        return;
      }

      setCheckingAdmin(true);
      try {
        const emailMatchesPrimary =
          Boolean(currentUser.emailVerified) &&
          currentUser.email?.toLowerCase() === PRIMARY_ADMIN_EMAIL;

        if (emailMatchesPrimary) {
          setIsAdmin(true);
        } else if (currentUser.emailVerified) {
          const adminSnap = await getDoc(doc(db, 'admins', currentUser.uid));
          setIsAdmin(adminSnap.exists());
        } else {
          setIsAdmin(false);
        }
      } catch {
        setIsAdmin(false);
      } finally {
        setCheckingAdmin(false);
        setAuthReady(true);
      }
    });

    return () => unsubscribe();
  }, []);

  const clearAuthError = () => setAuthError(null);

  const signInWithGoogle = async () => {
    setAuthError(null);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      setAuthError(formatFirebaseAuthError(err));
    }
  };

  const signInWithEmail = async (email: string, password: string): Promise<boolean> => {
    setAuthError(null);
    const trimmedEmail = email.trim();
    if (!trimmedEmail || !password) {
      setAuthError('Please enter both your email address and password.');
      return false;
    }

    try {
      await signInWithEmailAndPassword(auth, trimmedEmail, password);
      return true;
    } catch (err) {
      setAuthError(formatFirebaseAuthError(err));
      return false;
    }
  };

  const resetPassword = async (email: string): Promise<boolean> => {
    setAuthError(null);
    const trimmedEmail = email.trim();
    if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setAuthError('Please enter a valid email address to receive a password reset link.');
      return false;
    }

    try {
      await sendPasswordResetEmail(auth, trimmedEmail);
      return true;
    } catch (err) {
      setAuthError(formatFirebaseAuthError(err));
      return false;
    }
  };

  const resendVerificationEmail = async (): Promise<boolean> => {
    if (!auth.currentUser) return false;
    setAuthError(null);
    try {
      await sendEmailVerification(auth.currentUser);
      return true;
    } catch (err) {
      setAuthError(formatFirebaseAuthError(err));
      return false;
    }
  };

  const signOutUser = async () => {
    setAuthError(null);
    await signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        authReady,
        isAdmin,
        checkingAdmin,
        authError,
        clearAuthError,
        signInWithGoogle,
        signInWithEmail,
        resetPassword,
        resendVerificationEmail,
        signOutUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}
