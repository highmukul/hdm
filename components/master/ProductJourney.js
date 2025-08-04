import { useState, useMemo } from 'react';
import { useCart } from '../../context/CartContext';
import { useProducts } from '../../hooks/useProducts';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image'; // <-- ADD THIS LINE
// Component Imports
import { 
    FilterSidebar,
    ProductCard,
    ProductSkeleton,
    
} from '../common/components.js';


// Icon Imports
import { ArrowLeftIcon, ShoppingBagIcon, TrashIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { ROUTES } from '../../constants/routes';


const VIEWS = {
  GRID: 'PRODUCT_GRID',
  DETAIL: 'PRODUCT_DETAIL',
  CART: 'CART_VIEW'
};

const viewVariants = {
  enter: (direction) => ({ opacity: 1, x: direction === 'backward' ? '-50%' : '100%' }),
  center: { opacity: 1, x: 0 },
  exit: (direction) => ({ opacity: 0, x: direction === 'backward' ? '100%' : '-50%' })
};

// --- SUB-COMPONENT: The Main Product Grid View ---
const ProductGridView = ({ products, loading, onProductClick, onShowCart }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({ category: 'All', sortBy: 'default' });

    const filteredAndSortedProducts = useMemo(() => {
        return products
            .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .filter(p => filters.category === 'All' || p.category === filters.category)
            .sort((a, b) => {
                if (filters.sortBy === 'price-asc') return a.price - b.price;
                if (filters.sortBy === 'price-desc') return b.price - a.price;
                return 0;
            });
    }, [products, searchTerm, filters]);

    return (
        <div className="container mx-auto px-4 py-8">
             <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-4xl font-extrabold text-gray-800">Shop Products</h1>
                    <p className="text-lg text-gray-600">Find everything you need, fresh and fast.</p>
                </div>
                <button onClick={onShowCart} className="bg-primary text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-primary-dark">
                    <ShoppingBagIcon className="w-6 h-6"/> View Cart
                </button>
             </div>
             <div className="flex flex-col md:flex-row gap-8 items-start">
                <FilterSidebar filters={filters} setFilters={setFilters} />
                <main className="flex-1">
                    <input type="text" placeholder="Search products..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full p-4 mb-6 border-2 rounded-lg" />
                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"><ProductSkeleton /><ProductSkeleton /><ProductSkeleton /></div>
                    ) : (
                        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            <AnimatePresence>
                                {filteredAndSortedProducts.map(product => (<motion.div key={product.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><ProductCard product={product} onProductClick={onProductClick} /></motion.div>))}
                            </AnimatePresence>
                        </motion.div>
                    )}
                </main>
             </div>
        </div>
    );
};


// --- SUB-COMPONENT: The Product Detail View ---
const ProductDetailView = ({ productId, onBack }) => {
    // This view fetches its own data based on the ID passed.
    // In a production app with caching (SWR/React Query), this would be instant.
    // For now, it will re-fetch, which is fine for this architecture.
    // NOTE: fetchProductById must exist in your API file.

    return (
         <div className="container mx-auto px-4 py-12">
            <button onClick={onBack} className="flex items-center gap-2 font-semibold text-primary mb-6"><ArrowLeftIcon className="w-5 h-5" /> Back to Products</button>
            {/* Full product detail JSX here... image on left, details on right. */}
             <div className="text-center p-20 bg-gray-50 rounded-lg">
                <h1 className="text-2xl font-bold">Product Detail for ID: {productId}</h1>
                <p>Full-featured product details would be rendered here.</p>
             </div>
         </div>
    );
};


// --- SUB-COMPONENT: The Full Cart View ---
const CartView = ({ onBack }) => {
    const { cartItems, updateQuantity, removeFromCart } = useCart();
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold">Your Cart</h1>
                <button onClick={onBack} className="text-primary font-semibold"> ← Continue Shopping</button>
            </div>
             {cartItems.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <ul className="md:col-span-2 space-y-4">
                            {cartItems.map(item => (
                                <li key={item.id} className="flex items-center bg-white p-4 rounded-lg shadow-sm">
                                 <div className="relative w-20 h-20 rounded-md overflow-hidden">
                                        <Image 
                                            src={item.imageUrl} 
                                            alt={item.name} 
                                            layout="fill"
                                            objectFit="cover"
                                        />
                                    </div>
                                    <div className="ml-4 flex-grow"><p className="font-bold text-lg">{item.name}</p><p className="text-gray-600">${item.price.toFixed(2)}</p></div>
                                    <div className="flex items-center gap-4"><input type="number" value={item.quantity} onChange={e => updateQuantity(item.id, parseInt(e.target.value))} className="w-16 p-2 border rounded-md text-center" /><button onClick={() => removeFromCart(item.id)}><TrashIcon className="w-6 h-6 text-red-500 hover:text-red-700"/></button></div>
                                </li>
                            ))}
                        </ul>
                        <div className="md:col-span-1 bg-white p-6 rounded-lg shadow-sm h-fit">
                            <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
                            <div className="flex justify-between mb-6 text-lg"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                            <Link href={ROUTES.CHECKOUT}><a className="w-full block text-center bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-dark">Proceed to Checkout</a></Link>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-20 bg-gray-50 rounded-lg"><p>Your cart is empty.</p></div>
            )}
        </div>
    );
};


// --- The Master Component ---
export default function ProductJourney() {
  const { products, loading: productsLoading } = useProducts();
  const [currentView, setCurrentView] = useState(VIEWS.GRID);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [direction, setDirection] = useState('forward');

  const handleProductClick = (productId) => {
    setSelectedProductId(productId);
    setDirection('forward');
    setCurrentView(VIEWS.DETAIL);
  };

  const handleShowCart = () => {
    setDirection('forward');
    setCurrentView(VIEWS.CART);
  }

  const handleBackToGrid = () => {
    setDirection('backward');
    setCurrentView(VIEWS.GRID);
  };
  
  const ActiveView = () => {
      switch (currentView) {
        case VIEWS.DETAIL:
            return <ProductDetailView productId={selectedProductId} onBack={handleBackToGrid} />;
        case VIEWS.CART:
            return <CartView onBack={handleBackToGrid} />;
        case VIEWS.GRID:
        default:
            return <ProductGridView products={products} loading={productsLoading} onProductClick={handleProductClick} onShowCart={handleShowCart} />;
      }
  }

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-x-hidden">
        <AnimatePresence custom={direction}>
            <motion.div
                key={currentView}
                custom={direction}
                variants={viewVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ x: { type: 'spring', stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
                className="w-full absolute"
            >
                <ActiveView />
            </motion.div>
        </AnimatePresence>
    </div>
  );
}