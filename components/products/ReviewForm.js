import { useState } from 'react';
import { db } from '../../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../../context/AuthContext';
import StarRating from './StarRating';
import toast from 'react-hot-toast';

const ReviewForm = ({ productId }) => {
    const { user } = useAuth();
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            toast.error('You must be logged in to leave a review.');
            return;
        }
        if (rating === 0 || comment.trim() === '') {
            toast.error('Please provide a rating and a comment.');
            return;
        }

        await addDoc(collection(db, 'reviews'), {
            productId,
            userId: user.uid,
            userName: user.displayName,
            rating,
            comment,
            createdAt: serverTimestamp(),
        });

        setRating(0);
        setComment('');
        toast.success('Thank you for your review!');
    };

    return (
        <form onSubmit={handleSubmit} className="mt-8">
            <h3 className="text-xl font-bold mb-4">Leave a Review</h3>
            <div className="mb-4">
                <StarRating rating={rating} onRating={setRating} />
            </div>
            <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your review here..."
                className="w-full p-2 border rounded-lg"
                rows="4"
            ></textarea>
            <button type="submit" className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg">
                Submit Review
            </button>
        </form>
    );
};

export default ReviewForm;
