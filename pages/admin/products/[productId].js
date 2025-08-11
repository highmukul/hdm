import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase/config';
import AdminLayout from '../../../components/admin/AdminLayout';
import Spinner from '../../../components/ui/Spinner';

const ProductDetailsPage = () => {
    const router = useRouter();
    const { productId } = router.query;
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (productId) {
            const fetchProduct = async () => {
                setLoading(true);
                const docRef = doc(db, 'products', productId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setProduct({ id: docSnap.id, ...docSnap.data() });
                } else {
                    // Handle product not found
                }
                setLoading(false);
            };
            fetchProduct();
        }
    }, [productId]);

    if (loading) {
        return <AdminLayout><Spinner /></AdminLayout>;
    }

    if (!product) {
        return <AdminLayout><div>Product not found.</div></AdminLayout>;
    }

    return (
        <AdminLayout>
            <h1 className="text-2xl font-bold mb-4">Product Details</h1>
            <div>
                <p><strong>Product ID:</strong> {product.id}</p>
                <p><strong>Name:</strong> {product.name}</p>
                <p><strong>Price:</strong> ₹{product.price.toFixed(2)}</p>
                <p><strong>Stock:</strong> {product.stock}</p>
                {/* Add more product details here */}
            </div>
        </AdminLayout>
    );
};

export default ProductDetailsPage;
