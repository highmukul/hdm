import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/layout/Layout';
import { db } from '../../firebase/config';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { ProductImageCarousel } from '../../components/products/ProductImageCarousel';
import ProductReviews from '../../components/products/ProductReviews';
import ReviewForm from '../../components/products/ReviewForm';
import { useCart } from '../../context/CartContext';
import toast from 'react-hot-toast';
import * as FiIcons from 'react-icons/fi';
import Spinner from '../../components/ui/Spinner';

const ProductDetailPage = ({ initialProduct }) => {
    const router = useRouter();
    const { productId } = router.query;
    const [product, setProduct] = useState(initialProduct);
    const [loading, setLoading] = useState(!initialProduct);
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();

    useEffect(() => {
        if (!productId) return;
        
        const docRef = doc(db, 'products', productId);
        const unsubscribe = onSnapshot(docRef, (docSnap) => {
            if (docSnap.exists()) {
                setProduct({ id: docSnap.id, ...docSnap.data() });
            } else {
                // Handle case where product doesn't exist
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [productId]);

    if (loading || router.isFallback) {
        return <Layout><div className="flex justify-center items-center h-screen"><Spinner /></div></Layout>;
    }
    
    if (!product) {
        return <Layout><div className="text-center py-20">Product not found.</div></Layout>
    }

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
    
    const discountPercentage = product.mrp > 0 && product.price < product.mrp
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
    : 0;

    return (
        <Layout>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <ProductImageCarousel images={product.imageUrls} />
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
                        <div className="flex items-center mb-4">
                            <p className="text-3xl font-extrabold text-gray-900 mr-4">₹{product.price.toFixed(2)}</p>
                            {discountPercentage > 0 && (
                                <>
                                    <p className="text-xl text-gray-500 line-through mr-4">₹{product.mrp.toFixed(2)}</p>
                                    <div className="text-lg font-bold text-green-600 bg-green-100 px-3 py-1 rounded-full">
                                        {discountPercentage}% OFF
                                    </div>
                                </>
                            )}
                        </div>
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
                    <ProductReviews productId={product.id} />
                    <ReviewForm productId={product.id} />
                </div>
            </div>
            <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t shadow-lg flex space-x-4">
                <button onClick={handleAddToCart} className="w-1/2 flex items-center justify-center py-3 border border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50">
                    <FiIcons.FiShoppingCart className="mr-2" /> Add to Cart
                </button>
                <button onClick={handleBuyNow} className="w-1/2 flex items-center justify-center py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">
                    <FiIcons.FiZap className="mr-2" /> Buy Now
                </button>
            </div>
        </Layout>
    );
};

export async function getStaticPaths() {
    // We are not pre-rendering any paths at build time.
    // Paths will be generated on-demand.
    return {
        paths: [],
        fallback: 'blocking', // or true
    };
}

export async function getStaticProps({ params }) {
    const { productId } = params;
    const docRef = doc(db, 'products', productId);
    
    try {
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            return { notFound: true };
        }
        
        const product = { id: docSnap.id, ...docSnap.data() };
        
        // Basic serialization check
        const serializableProduct = JSON.parse(JSON.stringify(product));

        return {
            props: {
                initialProduct: serializableProduct,
            },
            revalidate: 60, // Re-generate the page every 60 seconds
        };
    } catch (error) {
        // If there's an error (e.g., permissions), treat as not found
        console.error("Error fetching product for", productId, error);
        return { notFound: true };
    }
}

export default ProductDetailPage;
