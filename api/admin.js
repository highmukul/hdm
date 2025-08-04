import { db } from '../firebase/config';
import { collection, doc, getDocs, addDoc, updateDoc, deleteDoc, getDoc, writeBatch } from 'firebase/firestore';

export const getDashboardStats = async () => {
    // This function must exist and work for the component to get data.
    try {
        const usersPromise = getDocs(collection(db, 'users'));
        const productsPromise = getDocs(collection(db, 'products'));
        const ordersPromise = getDocs(collection(db, 'orders'));
        
        const [users, products, orders] = await Promise.all([usersPromise, productsPromise, ordersPromise]);

        return { userCount: users.size, productCount: products.size, orderCount: orders.size };
    } catch (error) {
        console.error("Error fetching dashboard stats: ", error);
        // Re-throw or return default so the hook can catch it
        throw new Error("Could not fetch stats from Firestore.");
    }
};

// ... other admin API functions ...