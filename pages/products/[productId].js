import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/layout/Layout';
import { db } from '../../firebase/config';
import { doc, onSnapshot } from 'firebase/firestore';
import { ProductImageCarousel } from '../../components/products/ProductImageCarousel';
import { ProductReviews } from '../../components/products/ProductReviews';
import { useCart } from '../../context/CartContext';
import toast from 'react-hot-toast';
import { FiShoppingCart, FiZap } from 'react-icons/fi';

const ProductDetailPage = () => {
    const router = useRouter();
    const { productId } = router.query;
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();

    useEffect(() => {
        if (!productId) return;
        const unsubscribe = onSnapshot(doc(db, 'products', productId), (doc) => {
            setProduct({ id: doc.id, ...doc.data() });
            setLoading(false);
        });
        return () => unsubscribe();
    }, [productId]);

    const handleAddToCart = () => {
        if (product.stock < quantity) {
            toast.error('Not enough stock!');
            return;
        }
        addToCart(product, quantity);
        toast.success(`${quantity} x ${product.name} added to cart!`);
    };

    const handleBuyNow = () => {
        // This would typically redirect to a checkout page with the product pre-loaded
        handleAddToCart();
        router.push('/checkout');
    };

    if (loading) return <Layout><p>Loading...</p></Layout>;
    if (!product) return <Layout><p>Product not found.</p></Layout>;

    return (
        <Layout>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <ProductImageCarousel images={product.imageUrls} />
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
                        <div className="flex items-center mb-4">
                            {/* Star rating would go here */}
                        </div>
                        <p className="text-3xl font-extrabold text-gray-900 mb-4">₹{product.price.toFixed(2)}</p>
                        <p className="text-gray-600 mb-6">{product.description}</p>

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
                    <ProductReviews productId={productId} />
                </div>
            </div>

            {/* Fixed Footer for Actions */}
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
