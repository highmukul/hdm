import { db } from '../firebase/config';
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';

export const getUserAddresses = async (userId) => {
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data().addresses || [] : [];
};

export const addUserAddress = async (userId, newAddress) => {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
        addresses: arrayUnion(newAddress)
    });
};