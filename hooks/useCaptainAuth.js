import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

const CaptainAuthContext = createContext({
    captain: null,
    loading: true,
    signInWithGoogle: async () => {},
    logout: async () => {},
});

export const CaptainAuthProvider = ({ children }) => {
    const [captain, setCaptain] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const manageCaptain = async (firebaseUser) => {
        if (!firebaseUser) {
            setCaptain(null);
            setLoading(false);
            return;
        }

        const captainRef = doc(db, 'captains', firebaseUser.uid);
        const docSnap = await getDoc(captainRef);

        if (docSnap.exists()) {
            setCaptain({ ...firebaseUser, ...docSnap.data() });
        } else {
            // This is a sign-up flow, the full profile will be created on the signup page
            setCaptain(firebaseUser);
        }
        setLoading(false);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, manageCaptain);
        return () => unsubscribe();
    }, []);

    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            // The redirection logic is handled by the page component
        } catch (error) {
            toast.error("Captain sign-in failed.");
            console.error("Google Sign-In Error:", error);
        }
    };

    const logout = async () => {
        await signOut(auth);
        setCaptain(null);
        router.push('/captain/auth');
    };

    const value = { captain, loading, signInWithGoogle, logout };

    return (
        <CaptainAuthContext.Provider value={value}>
            {children}
        </CaptainAuthContext.Provider>
    );
};

export const useCaptainAuth = () => {
    return useContext(CaptainAuthContext);
}
