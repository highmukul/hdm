import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/layout/Layout';
import { db } from '../../firebase/config';
import { doc, onSnapshot, collection, query, where, orderBy, limit } from 'firebase/firestore';
import { ProductImageCarousel } from '../../components/products/ProductImageCarousel';
import { ProductReviews } from '../../components/products/ProductReviews';
import { useCart } from '../../context/CartContext';
import toast from 'react-hot-toast';
import { FiShoppingCart, FiZap } from 'react-icons/fi';
import { motion } from 'framer-motion';
import ProductCard from '../../components/products/ProductCard';

const ProductDetailPage = () => {
    const router = useRouter();
    const { storeId, productId } = router.query;
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('description');
    const [recommendations, setRecommendations] = useState([]);
    const { addToCart } = useCart();

    useEffect(() => {
        if (!storeId || !productId) return;
        const unsubscribe = onSnapshot(doc(db, 'stores', storeId, 'products', productId), (doc) => {
            setProduct({ id: doc.id, ...doc.data() });
            setLoading(false);
        });
        return () => unsubscribe();
    }, [storeId, productId]);

    useEffect(() => {
        if (!product) return;
        const q = query(
            collection(db, 'stores', storeId, 'products'),
            where('category', '==', product.category),
            where('id', '!=', product.id),
            orderBy('salesCount', 'desc'),
            limit(10)
        );
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setRecommendations(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });
        return unsubscribe;
    }, [product, storeId]);


    const handleAddToCart = () => {
        if (product.stock < quantity) {
            toast.error('Not enough stock!');
            return;
        }
        addToCart(product, quantity);
        toast.success(`${quantity} x ${product.name} added to cart!`);
    };

    const handleBuyNow = () => {
        handleAddToCart();
        router.push('/checkout');
    };

    if (loading) return <Layout><p>Loading...</p></Layout>;
    if (!product) return <Layout><p>Product not found.</p></Layout>;

    const discountedPrice = product.discountRules?.[0] ? (product.price - (product.price * (product.discountRules[0].value / 100))) : product.price;
    const platformFee = product.price * (product.platformFeePercent / 100);

    return (
        <Layout>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <ProductImageCarousel images={product.images} />
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
                        <p className="text-3xl font-extrabold text-gray-900 mb-4">₹{discountedPrice.toFixed(2)}</p>
                        {/* Price breakdown */}
                        <div className="flex items-center space-x-4 mb-6">
                            <label htmlFor="quantity" className="font-semibold">Quantity:</label>
                            <select
                                id="quantity"
                                className="p-2 border border-gray-300 rounded-lg"
                                value={quantity}
                                onChange={(e) => setQuantity(Number(e.target.value))}
                            >
                                {Array.from({ length: Math.min(product.stock, 10) }, (_, i) => i + 1).map(q => (
                                    <option key={q} value={q}>{q}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="mt-12">
                    {/* Tabs */}
                    <div className="border-b">
                        <nav className="-mb-px flex space-x-8">
                            <button onClick={() => setActiveTab('description')} className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'description' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>Description</button>
                            <button onClick={() => setActiveTab('reviews')} className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'reviews' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>Reviews</button>
                            <button onClick={() => setActiveTab('recommendations')} className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'recommendations' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>Recommendations</button>
                        </nav>
                    </div>
                    <div className="mt-8">
                        {activeTab === 'description' && <p>{product.description}</p>}
                        {activeTab === 'reviews' && <ProductReviews productId={product.id} storeId={storeId}/>}
                        {activeTab === 'recommendations' && (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {recommendations.map(rec => <ProductCard key={rec.id} product={rec} />)}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t shadow-lg flex space-x-4">
                <button
                    onClick={handleAddToCart}
                    className="w-1/2 flex items-center justify-center py-3 border border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50"
                >
                    <FiShoppingCart className="mr-2" />
                    Add to Cart
                </button>
                <button
                    onClick={handleBuyNow}
                    className="w-1/2 flex items-center justify-center py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
                >
                    <FiZap className="mr-2" />
                    Buy Now
                </button>
            </div>
        </Layout>
    );
};

export default ProductDetailPage;
