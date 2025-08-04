import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import { useRouter } from 'next/router';

const AuthContext = createContext();
const SUPER_ADMIN_EMAIL = "engrmukulgoel@gmail.com"; // <-- IMPORTANT: Change this to your email

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const docRef = doc(db, 'users', firebaseUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const dbUser = docSnap.data();
          // Override role to admin if the email matches SUPER_ADMIN_EMAIL
          const finalRole = firebaseUser.email === SUPER_ADMIN_EMAIL ? 'admin' : dbUser.role;
          setUser({ ...firebaseUser, ...dbUser, role: finalRole });
        } else {
          // New user, possibly from Google sign-in
          setUser(firebaseUser);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async (role = 'customer') => {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    const firebaseUser = userCredential.user;
    const docRef = doc(db, 'users', firebaseUser.uid);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      // If user is new, check if they are the super admin
      const assignedRole = firebaseUser.email === SUPER_ADMIN_EMAIL ? 'admin' : role;
      await setDoc(docRef, {
          uid: firebaseUser.uid,
          name: firebaseUser.displayName,
          email: firebaseUser.email,
          role: assignedRole,
          isProfileComplete: assignedRole !== 'captain',
          createdAt: new Date(),
      });
    }
  };
  
  // Other functions (login, signup, logout) remain largely the same...
  const signup = async (email, password, name) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await setDoc(doc(db, 'users', user.uid), { uid: user.uid, name, email, role: 'customer', createdAt: new Date() });
    return user;
  };
  const login = (email, password) => signInWithEmailAndPassword(auth, email, password);
  const logout = async () => { await signOut(auth); router.push('/login'); };

  const value = { user, loading, signup, login, signInWithGoogle, logout };

  return (
    <AuthContext.Provider value={value}>
      {loading ? <div className="h-screen flex items-center justify-center bg-background"><p>Loading Hadoti Daily Mart...</p></div> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
