import * as FaIcons from 'react-icons/fa';

const StarRating = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
        <div className="flex items-center">
            {[...Array(fullStars)].map((_, i) => <FaIcons.FaStar key={`full-${i}`} className="text-yellow-400" />)}
            {halfStar && <FaIcons.FaStarHalfAlt className="text-yellow-400" />}
            {[...Array(emptyStars)].map((_, i) => <FaIcons.FaRegStar key={`empty-${i}`} className="text-gray-300" />)}
        </div>
    );
};

export default StarRating;
