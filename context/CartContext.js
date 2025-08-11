import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { db } from '../firebase/config';
import { doc, getDoc, setDoc, updateDoc, deleteField } from 'firebase/firestore';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      if (user) {
        const cartRef = doc(db, 'carts', user.uid);
        const cartSnap = await getDoc(cartRef);
        if (cartSnap.exists()) {
          setCartItems(Object.values(cartSnap.data()));
        }
      }
      setLoading(false);
    };
    fetchCart();
  }, [user]);

  const updateFirestoreCart = async (newCartItems) => {
    if (!user) return;
    const cartRef = doc(db, 'carts', user.uid);
    const cartData = newCartItems.reduce((acc, item) => {
      acc[item.id] = item;
      return acc;
    }, {});
    await setDoc(cartRef, cartData);
  };

  const addToCart = async (product, quantity = 1) => {
    const newItems = [...cartItems];
    const itemIndex = newItems.findIndex(item => item.id === product.id);

    if (itemIndex > -1) {
      newItems[itemIndex].quantity += quantity;
    } else {
      newItems.push({ ...product, quantity });
    }
    
    setCartItems(newItems);
    await updateFirestoreCart(newItems);
    toast.success(`${product.name} added to cart!`);
  };

  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return;
    const newItems = cartItems.map(item =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(newItems);
    await updateFirestoreCart(newItems);
  };

  const removeFromCart = async (productId) => {
    const newItems = cartItems.filter(item => item.id !== productId);
    setCartItems(newItems);
    
    if (user) {
        const cartRef = doc(db, 'carts', user.uid);
        await updateDoc(cartRef, {
            [productId]: deleteField()
        });
    }

    toast.error("Item removed from cart.");
  };
  
  const clearCart = async () => {
    setCartItems([]);
    if (user) {
        const cartRef = doc(db, 'carts', user.uid);
        await setDoc(cartRef, {});
    }
  }

  const cartCount = useMemo(() => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  }, [cartItems]);

  const cartTotal = useMemo(() => {
    return cartItems.reduce((total, item) => total + (item.salePrice * item.quantity), 0);
  }, [cartItems]);

  const value = { cartItems, loading, addToCart, updateQuantity, removeFromCart, clearCart, cartCount, cartTotal };
  
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);