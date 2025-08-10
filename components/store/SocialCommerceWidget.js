import { useState } from 'react';
import * as FaIcons from 'react-icons/fa';

const SocialCommerceWidget = ({ productUrl }) => {
    const [isSharing, setIsSharing] = useState(false);

    const shareOnWhatsApp = () => {
        window.open(`https://api.whatsapp.com/send?text=Check out this product! ${productUrl}`);
    };
    
    const shareOnFacebook = () => {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${productUrl}`);
    };

    return (
        <div className="bg-blue-50 p-4 rounded-lg mt-6">
            <h3 className="font-bold text-lg mb-2">Share & Earn!</h3>
            <p className="text-sm text-gray-600 mb-4">Share this product with your friends and earn rewards when they buy.</p>
            <div className="flex space-x-4">
                <button onClick={shareOnWhatsApp} className="flex-1 flex items-center justify-center py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600">
                    <FaIcons.FaWhatsapp className="mr-2" /> Share
                </button>
                <button onClick={shareOnFacebook} className="flex-1 flex items-center justify-center py-2 px-4 bg-blue-800 text-white rounded-lg hover:bg-blue-900">
                    <FaIcons.FaFacebook className="mr-2" /> Share
                </button>
            </div>
        </div>
    );
};

export default SocialCommerceWidget;
