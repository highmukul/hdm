import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const manageUser = async (firebaseUser) => {
    if (!firebaseUser) {
      setUser(null);
      setLoading(false);
      return;
    }

    const idTokenResult = await firebaseUser.getIdTokenResult(true);
    const userRef = doc(db, 'users', firebaseUser.uid);
    const docSnap = await getDoc(userRef);

    let dbUser = {};
    if (docSnap.exists()) {
      dbUser = docSnap.data();
    } else {
      // Create user doc if it doesn't exist (e.g., first-time Google sign-in)
      dbUser = {
        name: firebaseUser.displayName || 'New User',
        email: firebaseUser.email,
        role: 'customer',
        createdAt: serverTimestamp(),
      };
      await setDoc(userRef, dbUser);
    }

    const finalRole = idTokenResult.claims.admin ? 'admin' : dbUser.role;
    const finalUser = {
      ...firebaseUser,
      ...dbUser,
      role: finalRole,
      isAdmin: idTokenResult.claims.admin === true,
    };
    
    setUser(finalUser);
    setLoading(false);
    return finalUser;
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, manageUser);
    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const finalUser = await manageUser(userCredential.user); // Re-manage user to get claims
      toast.success('Welcome back!');
      if (finalUser?.isAdmin) {
        router.push('/admin/dashboard');
      } else {
        router.push('/store');
      }
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  };

  const signInWithGoogle = async (role = 'customer') => {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      await manageUser(userCredential.user);
      toast.success('Signed in successfully!');
      router.push('/store');
    } catch (error) {
      toast.error('Google sign-in failed.');
      throw error;
    }
  };

  const signup = async (email, password, name) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userRef = doc(db, 'users', userCredential.user.uid);
      await setDoc(userRef, { name, email, role: 'customer', createdAt: serverTimestamp() });
      await manageUser(userCredential.user);
      toast.success('Account created!');
      router.push('/store');
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  };
  
  const logout = async () => { 
    await signOut(auth);
    setUser(null);
    router.push('/'); 
  };

  const value = { user, loading, signup, login, signInWithGoogle, logout };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </Auth.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
