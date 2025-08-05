import { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { FiStar } from 'react-icons/fi';

export const ProductReviews = ({ storeId, productId }) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!storeId || !productId) return;
        const q = query(
            collection(db, 'stores', storeId, 'products', productId, 'reviews'),
            orderBy('createdAt', 'desc')
        );
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setReviews(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            setLoading(false);
        });
        return () => unsubscribe();
    }, [storeId, productId]);

    const averageRating = reviews.length > 0
        ? (reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1)
        : 0;

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Reviews ({reviews.length})</h2>
            <div className="flex items-center mb-6">
                <span className="text-2xl font-bold mr-2">{averageRating}</span>
                <div className="flex">
                    {[...Array(5)].map((_, i) => (
                        <FiStar key={i} className={`w-6 h-6 ${i < Math.round(averageRating) ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} />
                    ))}
                </div>
            </div>

            {loading ? (
                <p>Loading reviews...</p>
            ) : reviews.length > 0 ? (
                <div className="space-y-6">
                    {reviews.map(review => (
                        <div key={review.id} className="border-b pb-4">
                            <div className="flex items-center mb-2">
                                <p className="font-semibold">{review.userName}</p>
                                <div className="flex ml-4">
                                    {[...Array(5)].map((_, i) => (
                                        <FiStar key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} />
                                    ))}
                                </div>
                            </div>
                            <p className="text-gray-600">{review.comment}</p>
                            <p className="text-sm text-gray-400 mt-2">{new Date(review.createdAt?.seconds * 1000).toLocaleDateString()}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No reviews yet.</p>
            )}
        </div>
    );
};

export default ProductReviews;
