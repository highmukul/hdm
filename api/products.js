import { db } from '../firebase/config';
import { collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';

// --- EXISTING FUNCTIONS ---
export const fetchProducts = async () => {
  const querySnapshot = await getDocs(collection(db, 'products'));
  const products = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return products;
};

export const fetchProductById = async (id) => {
    const docRef = doc(db, 'products', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
    } else {
        throw new Error("Product not found");
    }
};

// --- CRUD Functions for Admin Panel ---
export const addProduct = async (productData) => {
    await addDoc(collection(db, 'products'), productData);
};

export const updateProduct = async (productId, productData) => {
    const productRef = doc(db, 'products', productId);
    await updateDoc(productRef, productData);
};

// --- FIX: THIS WAS THE MISSING EXPORT ---
export const deleteProduct = async (productId) => {
    const productRef = doc(db, 'products', productId);
    await deleteDoc(productRef);
};