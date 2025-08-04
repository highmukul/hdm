import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../firebase/config';
import { collection, addDoc, query, onSnapshot, serverTimestamp, orderBy } from 'firebase/firestore';
import StarRating from './StarRating';
import toast from 'react-hot-toast';
import { FaStar } from 'react-icons/fa';

const ProductReviews = ({ productId }) => {
    const { user } = useAuth();
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState('');
    const [rating, setRating] = useState(0);

    useEffect(() => {
        if (!productId) return;
        const q = query(collection(db, 'products', productId, 'reviews'), orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setReviews(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });
        return unsubscribe;
    }, [productId]);

    const handleSubmitReview = async (e) => {
        e.preventDefault();
        if (!user) { toast.error("Please log in to leave a review."); return; }
        if (rating === 0) { toast.error("Please select a star rating."); return; }
        
        await addDoc(collection(db, 'products', productId, 'reviews'), {
            userId: user.uid,
            userName: user.name || user.displayName,
            rating,
            text: newReview,
            createdAt: serverTimestamp(),
        });
        setNewReview('');
        setRating(0);
        toast.success("Thank you for your review!");
    };

    return (
        <div className="card p-6 md:p-8">
            <h3 className="text-2xl font-bold mb-6 text-text-primary">Customer Reviews</h3>
            {user && (
                <form onSubmit={handleSubmitReview} className="mb-8 bg-background p-6 rounded-lg">
                    <h4 className="font-semibold mb-2 text-text-primary">Leave a Review</h4>
                    <div className="flex items-center mb-4">
                        {[1, 2, 3, 4, 5].map(star => (
                            <FaStar key={star} className={`cursor-pointer text-3xl transition-colors ${rating >= star ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-200'}`} onClick={() => setRating(star)} />
                        ))}
                    </div>
                    <textarea value={newReview} onChange={(e) => setNewReview(e.target.value)} placeholder={`Share your thoughts on this product, ${user.name || ''}...`} className="input-field w-full" required rows="4"/>
                    <button type="submit" className="btn-primary mt-4">Submit Review</button>
                </form>
            )}
            <div className="space-y-6">
                {reviews.length > 0 ? reviews.map(review => (
                    <div key={review.id} className="border-b border-border pb-4">
                        <div className="flex items-center mb-2">
                           <StarRating rating={review.rating} />
                           <p className="ml-4 font-bold text-text-primary">{review.userName}</p>
                           <p className="ml-auto text-xs text-text-secondary">{review.createdAt ? new Date(review.createdAt.seconds * 1000).toLocaleDateString() : ''}</p>
                        </div>
                        <p className="text-text-secondary">{review.text}</p>
                    </div>
                )) : <p className="text-text-secondary">No reviews yet. Be the first to share your thoughts!</p>}
            </div>
        </div>
    );
};

export default ProductReviews;
