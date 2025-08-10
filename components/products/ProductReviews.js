import { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import StarRating from './StarRating';

const ProductReviews = ({ productId }) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const q = query(collection(db, 'reviews'), where('productId', '==', productId));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setReviews(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            setLoading(false);
        });
        return unsubscribe;
    }, [productId]);

    if (loading) return <p>Loading reviews...</p>;

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
            {reviews.length === 0 ? (
                <p>No reviews yet.</p>
            ) : (
                <div className="space-y-4">
                    {reviews.map(review => (
                        <div key={review.id} className="border-b pb-4">
                            <StarRating rating={review.rating} />
                            <p className="font-bold">{review.userName}</p>
                            <p>{review.comment}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductReviews;
