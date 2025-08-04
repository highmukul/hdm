import { db } from '../firebase/config';
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';

// --- FIX: THIS WAS THE MISSING EXPORT ---
export const checkCaptainAvailability = async (zipCode) => {
    const captainsRef = collection(db, 'users');
    const q = query(
        captainsRef, 
        where('role', '==', 'captain'),
        where('status', '==', 'active'),
        where('serviceZipCodes', 'array-contains', zipCode)
    );
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
};

// --- OTHER FUNCTIONS ---
export const setCaptainStatus = async (captainId, status) => {
    const captainRef = doc(db, 'users', captainId);
    await updateDoc(captainRef, { status: status });
};

export const updateCaptainProfile = async (captainId, profileData) => {
    const captainRef = doc(db, 'users', captainId);
    await updateDoc(captainRef, profileData);
};