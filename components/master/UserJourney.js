import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGoogle } from 'react-icons/fa';

// --- CORRECTED: All common components now imported from one place ---
import { FilterSidebar, ProductCard, ProductSkeleton, OrderHistoryItem, Spinner } from '../common/components.js';

import { useProducts } from '../../hooks/useProducts';
import { fetchUserOrders } from '../../api/orders';
import AuthForm from '../auth/AuthForm';

const viewVariants = {
  enter: { opacity: 1, x: 0, transition: { duration: 0.3, ease: 'easeInOut' } },
  exit: (direction) => ({ opacity: 0, x: direction * 200, transition: { duration: 0.3, ease: 'easeInOut' } }),
};

// --- Sub-component for the Main Product Home View ---
const HomeView = ({ products, loading }) => {
    const [searchTerm, setSearchTerm] = useState(''); const [filters, setFilters] = useState({ category: 'All', sortBy: 'default' });
    const filteredAndSortedProducts = products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())).filter(p => filters.category === 'All' || p.category === filters.category).sort((a, b) => { if (filters.sortBy === 'price-asc') return a.price - b.price; if (filters.sortBy === 'price-desc') return b.price - a.price; return 0; });
    return (<div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8 items-start"><FilterSidebar filters={filters} setFilters={setFilters} /><main className="flex-1"><input type="text" placeholder="Search products..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full p-4 mb-6 border-2 rounded-lg" />{loading ? (<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">{Array.from({ length: 6 }).map((_, i) => <ProductSkeleton key={i} />)}</div>) : (<motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"><AnimatePresence>{filteredAndSortedProducts.map(product => (<motion.div key={product.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><ProductCard product={product} /></motion.div>))}</AnimatePresence></motion.div>)}</main></div>);
};

// --- Sub-component for the Profile & Orders View ---
const ProfileView = ({ setView }) => {
    const { user, logout } = useAuth(); const [orders, setOrders] = useState([]); const [loadingOrders, setLoadingOrders] = useState(true);
    useEffect(() => { if (user) { fetchUserOrders(user.uid).then(setOrders).finally(() => setLoadingOrders(false)); } }, [user]);
    return (<div className="container mx-auto px-4 py-12 max-w-4xl"><div className="flex justify-between items-center mb-10"><div><h1 className="text-4xl font-bold">{user.name}</h1><p className="text-lg text-gray-500">{user.email}</p></div><button onClick={logout} className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600">Logout</button></div><h2 className="text-3xl font-bold mb-8">My Orders</h2>{loadingOrders ? (<div className="flex justify-center"><Spinner/></div>) : orders.length > 0 ? (<div className="space-y-6">{orders.map(order => <OrderHistoryItem key={order.id} order={order} />)}</div>) : (<p className="text-center text-gray-500 py-10">You haven't placed any orders yet.</p>)}</div>)
}

// --- The Master Component ---
const UserJourney = ({ initialView = 'HOME' }) => {
  const { user, login, signup, signInWithGoogle, loading: authLoading } = useAuth(); const { products, loading: productsLoading } = useProducts(); const [currentView, setCurrentView] = useState(initialView); const [direction, setDirection] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => { if (!authLoading) { if (user && (currentView === 'LOGIN' || currentView === 'SIGNUP')) { handleSetView('HOME'); } if (!user && (currentView !== 'LOGIN' && currentView !== 'SIGNUP')) { handleSetView('LOGIN'); } } }, [user, authLoading]);
  const handleSetView = (newView) => { const order = ['LOGIN', 'SIGNUP', 'HOME', 'PROFILE']; setDirection(order.indexOf(newView) > order.indexOf(currentView) ? 1 : -1); setCurrentView(newView); };
  
  const handleLogin = async (email, password) => {
    setError(null);
    try {
      await login(email, password);
    } catch (error) {
      setError(error.message.replace('Firebase: ', ''));
    }
  };

  const handleSignup = async (email, password) => {
    setError(null);
    try {
      await signup(email, password);
    } catch (error) {
      setError(error.message.replace('Firebase: ', ''));
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    try {
      await signInWithGoogle();
    } catch (error) {
      setError(error.message.replace('Firebase: ', ''));
    }
  };

  if (authLoading) return <div className="h-screen w-screen flex items-center justify-center"><Spinner/></div>
  return (<div className="min-h-screen"><AnimatePresence exitBeforeEnter custom={direction}><motion.div key={currentView} custom={direction} variants={viewVariants} initial="exit" animate="enter" exit="exit" className="h-full">{(currentView === 'LOGIN' || currentView === 'SIGNUP') && <AuthForm view={currentView} setView={handleSetView} onLogin={handleLogin} onSignup={handleSignup} onGoogleSignIn={handleGoogleSignIn} loading={authLoading} error={error} />}{currentView === 'HOME' && user && <HomeView products={products} loading={productsLoading} />}{currentView === 'PROFILE' && user && <ProfileView setView={handleSetView} />}</motion.div></AnimatePresence></div>);
};

export default UserJourney;