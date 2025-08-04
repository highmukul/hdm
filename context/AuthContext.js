import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import { useRouter } from 'next/router';

const AuthContext = createContext();
const SUPER_ADMIN_EMAIL = "engrmukulgoel@gmail.com";

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
          const finalRole = firebaseUser.email === SUPER_ADMIN_EMAIL ? 'admin' : dbUser.role;
          setUser({ ...firebaseUser, ...dbUser, role: finalRole });
        } else {
          // New user from Google sign-in
          const assignedRole = firebaseUser.email === SUPER_ADMIN_EMAIL ? 'admin' : 'customer';
          const newUser = {
            uid: firebaseUser.uid,
            name: firebaseUser.displayName,
            email: firebaseUser.email,
            role: assignedRole,
            isProfileComplete: assignedRole !== 'captain',
            createdAt: new Date(),
          };
          await setDoc(docRef, newUser);
          setUser({ ...firebaseUser, ...newUser });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };
  
  const signup = async (email, password, name) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await setDoc(doc(db, 'users', user.uid), { uid: user.uid, name, email, role: 'customer', createdAt: new Date() });
    return user;
  };

  const login = (email, password) => signInWithEmailAndPassword(auth, email, password);
  
  const logout = async () => { 
    await signOut(auth);
    router.push('/login'); 
  };

  const value = { user, loading, signup, login, signInWithGoogle, logout };

  return (
    <AuthContext.Provider value={value}>
      {loading ? <div className="h-screen flex items-center justify-center bg-background"><p>Loading Hadoti Daily Mart...</p></div> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
