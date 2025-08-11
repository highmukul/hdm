import { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc, query, where } from 'firebase/firestore';
import toast from 'react-hot-toast';

export const useUserAddresses = (userId) => {
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!userId) {
            setAddresses([]);
            setLoading(false);
            return;
        }

        const addressesQuery = query(collection(db, 'users', userId, 'addresses'));
        const unsubscribe = onSnapshot(addressesQuery, (snapshot) => {
            const userAddresses = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setAddresses(userAddresses);
            setLoading(false);
        }, () => setLoading(false));

        return () => unsubscribe();
    }, [userId]);

    const addAddress = async (addressData) => {
        try {
            const addressesRef = collection(db, 'users', userId, 'addresses');
            await addDoc(addressesRef, addressData);
            toast.success('Address added successfully!');
        } catch (error) {
            toast.error('Failed to add address.');
        }
    };

    const updateAddress = async (addressId, addressData) => {
        try {
            const addressRef = doc(db, 'users', userId, 'addresses', addressId);
            await updateDoc(addressRef, addressData);
            toast.success('Address updated successfully!');
        } catch (error) {
            toast.error('Failed to update address.');
        }
    };

    const deleteAddress = async (addressId) => {
        try {
            const addressRef = doc(db, 'users', userId, 'addresses', addressId);
            await deleteDoc(addressRef);
            toast.success('Address deleted successfully!');
        } catch (error) {
            toast.error('Failed to delete address.');
        }
    };

    return { addresses, loading, addAddress, updateAddress, deleteAddress };
};
