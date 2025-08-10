import { db, storage } from '../firebase/config';
import { collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

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

export const createProduct = async (productData) => {
    await addDoc(collection(db, 'products'), productData);
};

export const updateProduct = async (productId, productData) => {
    const productRef = doc(db, 'products', productId);
    await updateDoc(productRef, productData);
};

export const deleteProduct = async (productId) => {
    const productRef = doc(db, 'products', productId);
    await deleteDoc(productRef);
};

export const uploadImage = async (file) => {
  const storageRef = ref(storage, `products/${Date.now()}-${file.name}`);
  await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
};

export const deleteImage = async (imageUrl) => {
    const imageRef = ref(storage, imageUrl);
    await deleteObject(imageRef);
};
