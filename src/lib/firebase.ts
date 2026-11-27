import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import appletConfig from '../../firebase-applet-config.json';

const resolvedConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || appletConfig.apiKey,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || appletConfig.authDomain,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || appletConfig.projectId,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || appletConfig.storageBucket,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || appletConfig.messagingSenderId,
  appId: import.meta.env.VITE_FIREBASE_APP_ID || appletConfig.appId,
  firestoreDatabaseId: import.meta.env.VITE_FIREBASE_DATABASE_ID || appletConfig.firestoreDatabaseId
};

const app = getApps().length ? getApp() : initializeApp(resolvedConfig);

export const db = resolvedConfig.firestoreDatabaseId && resolvedConfig.firestoreDatabaseId !== '(default)'
  ? getFirestore(app, resolvedConfig.firestoreDatabaseId)
  : getFirestore(app);

export const auth = getAuth(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

export const PRIMARY_ADMIN_EMAIL =
  (import.meta.env.VITE_PRIMARY_ADMIN_EMAIL as string | undefined)?.trim().toLowerCase() ||
  'agripachotamasege23@gmail.com';

async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'websiteSettings', 'global'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error('Please check your Firebase configuration.');
    }
  }
}

if (typeof window !== 'undefined' && navigator.onLine) {
  void testConnection();
}

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write'
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function buildFirestoreErrorInfo(
  error: unknown,
  operationType: OperationType,
  path: string | null
): FirestoreErrorInfo {
  return {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo:
        auth.currentUser?.providerData?.map((provider) => ({
          providerId: provider.providerId,
          email: provider.email
        })) || []
    },
    operationType,
    path
  };
}

export function formatFirestoreActionError(
  error: unknown,
  operationType: OperationType,
  path: string | null
): string {
  const errInfo = buildFirestoreErrorInfo(error, operationType, path);
  console.error('Firestore Error: ', JSON.stringify(errInfo));

  const raw = errInfo.error;
  const lower = raw.toLowerCase();

  if (lower.includes('requests-from-referer')) {
    return 'Domain hii haijaruhusiwa kwenye Firebase API Key HTTP Referrer restrictions (Google Cloud Console). Ongeza domain ya tovuti yako ili kuunganisha na Firestore.';
  }
  if (lower.includes('permission-denied') || lower.includes('missing or insufficient permissions')) {
    if (!auth.currentUser) {
      return 'Haujaingia kama Admin. Tafadhali ingia tena kwenye Admin Panel.';
    }
    if (!auth.currentUser.emailVerified) {
      return `Barua pepe yako (${auth.currentUser.email}) haijathibitishwa (email_verified). Thibitisha barua pepe kisha ingia upya.`;
    }
    return 'Imekataliwa na Firestore Security Rules (permission-denied). Hakikisha umeingia kwa akaunti ya Admin iliyoidhinishwa na taarifa zote zimejazwa ipasavyo.';
  }
  if (lower.includes('unavailable') || lower.includes('offline') || lower.includes('network')) {
    return 'Imeshindwa kuunganisha na seva ya Cloud Firestore. Hakikisha intaneti inafanya kazi na jaribu tena.';
  }
  return raw;
}

export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null
): never {
  const errInfo = buildFirestoreErrorInfo(error, operationType, path);
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}
