import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';
import { FIREBASE_CONFIG } from './constants';

// Initialize Firebase
// Note: In a real deployment, these values come from process.env or the constants file
const app = initializeApp(FIREBASE_CONFIG);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export default app;