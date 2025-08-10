import Link from 'next/link';
import * as FiIcons from 'react-icons/fi';

const BottomNav = () => {
    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg z-40">
            <div className="flex justify-around py-2">
                <Link href="/" legacyBehavior>
                    <a className="flex flex-col items-center text-gray-600 hover:text-blue-600">
                        <FiIcons.FiHome size={24} />
                        <span className="text-xs">Home</span>
                    </a>
                </Link>
                <Link href="/cart" legacyBehavior>
                    <a className="flex flex-col items-center text-gray-600 hover:text-blue-600">
                        <FiIcons.FiShoppingBag size={24} />
                        <span className="text-xs">Cart</span>
                    </a>
                </Link>
                <Link href="/profile" legacyBehavior>
                    <a className="flex flex-col items-center text-gray-600 hover:text-blue-600">
                        <FiIcons.FiUser size={24} />
                        <span className="text-xs">Profile</span>
                    </a>
                </Link>
            </div>
        </div>
    );
};

export default BottomNav;
