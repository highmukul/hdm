import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/layout/Layout';
import { db } from '../../firebase/config';
import { doc, getDoc, onSnapshot, DocumentData } from 'firebase/firestore';
import { ProductImageGallery } from '../../components/products/ProductImageGallery';
import ProductReviews from '../../components/products/ProductReviews';
import ReviewForm from '../../components/products/ReviewForm';
import RelatedProducts from '../../components/products/RelatedProducts';
import { useCart } from '../../context/CartContext';
import toast from 'react-hot-toast';
import * as FiIcons from 'react-icons/fi';
import Spinner from '../../components/ui/Spinner';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import React from 'react';

interface Product extends DocumentData {
    id: string;
    name: string;
    price: number;
    mrp: number;
    description: string;
    stock: number;
    imageUrls: string[];
    categoryId: string;
}

interface ProductDetailPageProps {
    initialProduct: Product;
}

const ProductDetailPage: NextPage<ProductDetailPageProps> = ({ initialProduct }) => {
    const router = useRouter();
    const { productId } = router.query;
    const [product, setProduct] = useState(initialProduct);
    const [loading, setLoading] = useState(!initialProduct);
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('description');
    const { addToCart } = useCart();

    useEffect(() => {
        if (!productId) return;
        
        const docRef = doc(db, 'products', productId as string);
        const unsubscribe = onSnapshot(docRef, (docSnap) => {
            if (docSnap.exists()) {
                setProduct({ id: docSnap.id, ...docSnap.data() } as Product);
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <ProductImageGallery images={product.imageUrls} />
                    <div>
                        <h1 className="text-4xl font-extrabold text-gray-900 mb-3">{product.name}</h1>
                        <div className="flex items-center mb-5">
                            <p className="text-3xl font-bold text-indigo-600 mr-4">₹{product.price.toFixed(2)}</p>
                            {discountPercentage > 0 && (
                                <>
                                    <p className="text-xl text-gray-500 line-through mr-4">₹{product.mrp.toFixed(2)}</p>
                                    <span className="text-lg font-semibold text-green-600 bg-green-100 px-3 py-1 rounded-full">
                                        {discountPercentage}% OFF
                                    </span>
                                </>
                            )}
                        </div>
                        <div className="flex items-center space-x-4 mb-6">
                            <label htmlFor="quantity" className="font-semibold text-lg">Quantity:</label>
                            <select
                                id="quantity"
                                className="p-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                value={quantity}
                                onChange={(e) => setQuantity(Number(e.target.value))}
                            >
                                {Array.from({ length: Math.min(product.stock, 10) }, (_, i) => i + 1).map(q => (
                                    <option key={q} value={q}>{q}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex space-x-4 mb-8">
                            <button onClick={handleAddToCart} className="flex-1 flex items-center justify-center py-3 px-6 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                                <FiIcons.FiShoppingCart className="mr-2" /> Add to Cart
                            </button>
                            <button onClick={handleBuyNow} className="flex-1 flex items-center justify-center py-3 px-6 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700">
                                <FiIcons.FiZap className="mr-2" /> Buy Now
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-16">
                    <div className="border-b border-gray-200">
                        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                            <button onClick={() => setActiveTab('description')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg ${activeTab === 'description' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                                Description
                            </button>
                            <button onClick={() => setActiveTab('reviews')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg ${activeTab === 'reviews' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                                Reviews
                            </button>
                        </nav>
                    </div>
                    <div className="py-6">
                        {activeTab === 'description' && <p>{product.description}</p>}
                        {activeTab === 'reviews' && (
                            <>
                                <ProductReviews productId={product.id} />
                                <ReviewForm productId={product.id} />
                            </>
                        )}
                    </div>
                </div>
                
                <RelatedProducts categoryId={product.categoryId} currentProductId={product.id} />
            </div>
        </Layout>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: 'blocking',
    };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { productId } = params!;
    const docRef = doc(db, 'products', productId as string);
    
    try {
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            return { notFound: true };
        }
        
        const product = { id: docSnap.id, ...docSnap.data() };
        const serializableProduct = JSON.parse(JSON.stringify(product));

        return {
            props: {
                initialProduct: serializableProduct,
            },
            revalidate: 60,
        };
    } catch (error) {
        console.error("Error fetching product for", productId, error);
        return { notFound: true };
    }
}

export default ProductDetailPage;
