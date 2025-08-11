import { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc, query, DocumentData } from 'firebase/firestore';
import toast from 'react-hot-toast';
import React from 'react';

interface Address extends DocumentData {
    id: string;
    name: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    pincode: string;
    mobile: string;
    isPrimary: boolean;
}

export const useUserAddresses = (userId: string | undefined) => {
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!userId) {
            setAddresses([]);
            setLoading(false);
            return;
        }

        const addressesQuery = query(collection(db, 'users', userId, 'addresses'));
        const unsubscribe = onSnapshot(addressesQuery, (snapshot) => {
            const userAddresses = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Address));
            setAddresses(userAddresses);
            setLoading(false);
        }, () => setLoading(false));

        return () => unsubscribe();
    }, [userId]);

    const addAddress = async (addressData) => {
        try {
            const addressesRef = collection(db, 'users', userId as string, 'addresses');
            await addDoc(addressesRef, addressData);
            toast.success('Address added successfully!');
        } catch (error) {
            toast.error('Failed to add address.');
        }
    };

    const updateAddress = async (addressId, addressData) => {
        try {
            const addressRef = doc(db, 'users', userId as string, 'addresses', addressId);
            await updateDoc(addressRef, addressData);
            toast.success('Address updated successfully!');
        } catch (error) {
            toast.error('Failed to update address.');
        }
    };

    const deleteAddress = async (addressId) => {
        try {
            const addressRef = doc(db, 'users', userId as string, 'addresses', addressId);
            await deleteDoc(addressRef);
            toast.success('Address deleted successfully!');
        } catch (error) {
            toast.error('Failed to delete address.');
        }
    };

    return { addresses, loading, addAddress, updateAddress, deleteAddress };
};
