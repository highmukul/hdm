import { db } from '../firebase/config';
import { collection, addDoc, query, where, getDocs, doc, updateDoc, orderBy, limit } from 'firebase/firestore';

export const placeOrder = async (orderData) => {
    await addDoc(collection(db, 'orders'), orderData);
};

// --- FIX: THIS WAS A MISSING EXPORT ---
export const fetchAvailableOrders = async (captainZipCodes) => {
    if (!captainZipCodes || captainZipCodes.length === 0) {
        return [];
    }
    const ordersRef = collection(db, 'orders');
    const q = query(
        ordersRef,
        where('status', '==', 'pending_assignment'),
        where('deliveryAddress.zipCode', 'in', captainZipCodes)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// --- FIX: THIS WAS A MISSING EXPORT ---
export const acceptOrder = async (orderId, captainId) => {
    const orderRef = doc(db, 'orders', orderId);
    await updateDoc(orderRef, {
        status: 'accepted',
        assignedCaptainId: captainId,
    });
};

// --- FIX: THIS WAS A MISSING EXPORT ---
export const fetchUserOrders = async (userId) => {
    const ordersRef = collection(db, 'orders');
    const q = query(
        ordersRef, 
        where('customerId', '==', userId), 
        orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data(),
        createdAt: doc.data().createdAt.toDate().toLocaleDateString(),
    }));
};

export const fetchCaptainActiveOrder = async (captainId) => {
    const ordersRef = collection(db, 'orders');
    const q = query(
        ordersRef,
        where('assignedCaptainId', '==', captainId),
        where('status', 'in', ['accepted', 'in_transit']),
        limit(1)
    );
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        return { id: doc.id, ...doc.data() };
    }
    return null;
};

export const updateOrderStatus = async (orderId, newStatus) => {
    const orderRef = doc(db, 'orders', orderId);
    let updateData = { status: newStatus };
    if (newStatus === 'delivered') {
        updateData.deliveredAt = new Date();
    }
    await updateDoc(orderRef, updateData);
};