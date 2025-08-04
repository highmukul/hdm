import { useRouter } from 'next/router';
import Layout from '../../components/layout/Layout';
import ProductReviews from '../../components/products/ProductReviews';
import ImageCarousel from '../../components/products/ImageCarousel';
import { useCart } from '../../context/CartContext';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { db } from '../../firebase/config';
import { doc, getDoc } from 'firebase/firestore';

const ProductDetailPage = () => {
    const router = useRouter();
    const { productId } = router.query;
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchProduct = async () => {
            if (!productId) return;
            setLoading(true);
            const docRef = doc(db, 'products', productId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setProduct({ id: docSnap.id, ...docSnap.data() });
            } else {
                toast.error("Product not found!");
            }
            setLoading(false);
        };
        fetchProduct();
    }, [productId]);

    if (loading || !product) {
        return <Layout><div className="text-center p-10 text-text-secondary">Loading Product Details...</div></Layout>;
    }
    
    const discountPercentage = product.mrp > product.price ? Math.round(((product.mrp - product.price) / product.mrp) * 100) : 0;
    const handleAddToCart = () => {
        if (product.stock > 0) {
            addToCart(product, quantity);
            toast.success(`${quantity} x ${product.name} added to cart!`);
        } else {
            toast.error("Sorry, this item is out of stock.");
        }
    };

    return (
        <Layout>
            <div className="container mx-auto px-4 py-8 md:py-12">
                <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <ImageCarousel imageUrls={product.imageUrls || ['/placeholder.png']} />
                    
                    <div className="flex flex-col">
                        <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-3">{product.name}</h1>
                        <p className="text-text-secondary mb-6">{product.description || "No description available."}</p>
                        
                        <div className="flex items-baseline gap-4 mb-6">
                            <span className="text-4xl font-bold text-primary">₹{product.price}</span>
                            {product.mrp > product.price && <span className="text-xl line-through text-text-secondary">MRP ₹{product.mrp}</span>}
                        </div>
                        
                        <div className="card p-4 mb-8">
                            <table className="w-full">
                                <tbody>
                                    <tr className="border-b border-border"><td className="py-2 font-semibold text-text-secondary">Discount</td><td className="py-2 text-green-500 font-bold">{discountPercentage > 0 ? `${discountPercentage}% OFF` : 'N/A'}</td></tr>
                                    <tr className="border-b border-border"><td className="py-2 font-semibold text-text-secondary">Availability</td><td className={`py-2 font-bold ${product.stock > 0 ? 'text-green-500' : 'text-red-500'}`}>{product.stock > 0 ? `${product.stock} in Stock` : 'Out of Stock'}</td></tr>
                                    <tr><td className="py-2 font-semibold text-text-secondary">Seller</td><td className="py-2 text-text-primary">{product.seller || 'Hadoti Daily Mart'}</td></tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            <div className="flex items-center border border-border rounded-lg">
                                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="p-4 text-text-secondary hover:text-primary"><FaMinus/></button>
                                <span className="px-6 font-bold text-xl text-text-primary">{quantity}</span>
                                <button onClick={() => setQuantity(q => Math.min(5, q + 1))} className="p-4 text-text-secondary hover:text-primary"><FaPlus/></button>
                            </div>
                            <button onClick={handleAddToCart} className="w-full sm:w-auto flex-grow btn-primary text-lg" disabled={product.stock === 0}>Add to Cart</button>
                        </div>
                    </div>
                </motion.div>
                
                <div className="mt-16">
                    <ProductReviews productId={productId} />
                </div>
            </div>
        </Layout>
    );
};

export default ProductDetailPage;
