import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGoogle } from 'react-icons/fa';

// --- CORRECTED: All common components now imported from one place ---
import { FilterSidebar, ProductCard, ProductSkeleton, OrderHistoryItem, Spinner } from '../common/components.js';

import { useProducts } from '../../hooks/useProducts';
import { fetchUserOrders } from '../../api/orders';

const viewVariants = {
  enter: { opacity: 1, x: 0, transition: { duration: 0.3, ease: 'easeInOut' } },
  exit: (direction) => ({ opacity: 0, x: direction * 200, transition: { duration: 0.3, ease: 'easeInOut' } }),
};

// --- Sub-component for the Login View ---
const LoginView = ({ setView }) => {
    const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); const [error, setError] = useState(null); const [loading, setLoading] = useState(false); const { login, signInWithGoogle } = useAuth();
    const handleLogin = async (e) => { e.preventDefault(); setLoading(true); setError(null); try { await login(email, password); } catch (error) { setError(error.message.replace('Firebase: ', '')); setLoading(false); } };
    return (<div className="flex items-center justify-center min-h-full bg-gray-50 px-4"><div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg"><h2 className="text-3xl font-extrabold text-center text-gray-900">Welcome Back</h2><button onClick={signInWithGoogle} className="w-full flex items-center justify-center py-3 px-4 text-sm font-medium rounded-md border hover:bg-gray-50"><FaGoogle className="w-5 h-5 mr-2" /> Continue with Google</button><div className="text-center text-sm text-gray-500">OR</div><form className="space-y-6" onSubmit={handleLogin}><input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Email" required className="w-full px-4 py-2 border rounded-md"/><input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" required className="w-full px-4 py-2 border rounded-md"/>{error && <p className="text-red-500 text-sm text-center">{error}</p>}<button type="submit" disabled={loading} className="w-full py-3 px-4 font-medium text-white bg-primary rounded-md hover:bg-primary-dark disabled:bg-indigo-300">{loading ? 'Logging in...' : 'Log In'}</button></form><p className="text-sm text-center text-gray-600">Not have an account?{' '}<button onClick={() => setView('SIGNUP')} className="font-medium text-primary hover:text-primary-dark">Sign up</button></p></div></div>);
};

// --- Sub-component for the Signup View ---
const SignUpView = ({ setView }) => {
    return (<div className="flex items-center justify-center min-h-full bg-gray-50 px-4"><div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg"><h2 className="text-3xl font-extrabold text-center text-gray-900">Create an Account</h2>{/* Signup form here */}<p className="mt-4 text-sm text-center text-gray-600">Already have an account?{' '}<button onClick={() => setView('LOGIN')} className="font-medium text-primary hover:text-primary-dark">Log in</button></p></div></div>)
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
  const { user, loading: authLoading } = useAuth(); const { products, loading: productsLoading } = useProducts(); const [currentView, setCurrentView] = useState(initialView); const [direction, setDirection] = useState(1);
  useEffect(() => { if (!authLoading) { if (user && (currentView === 'LOGIN' || currentView === 'SIGNUP')) { handleSetView('HOME'); } if (!user && (currentView !== 'LOGIN' && currentView !== 'SIGNUP')) { handleSetView('LOGIN'); } } }, [user, authLoading]);
  const handleSetView = (newView) => { const order = ['LOGIN', 'SIGNUP', 'HOME', 'PROFILE']; setDirection(order.indexOf(newView) > order.indexOf(currentView) ? 1 : -1); setCurrentView(newView); };
  if (authLoading) return <div className="h-screen w-screen flex items-center justify-center"><Spinner/></div>
  return (<div className="min-h-screen"><AnimatePresence exitBeforeEnter custom={direction}><motion.div key={currentView} custom={direction} variants={viewVariants} initial="exit" animate="enter" exit="exit" className="h-full">{currentView === 'LOGIN' && <LoginView setView={handleSetView} />}{currentView === 'SIGNUP' && <SignUpView setView={handleSetView} />}{currentView === 'HOME' && user && <HomeView products={products} loading={productsLoading} />}{currentView === 'PROFILE' && user && <ProfileView setView={handleSetView} />}</motion.div></AnimatePresence></div>);
};

export default UserJourney;