import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useRouter } from 'next/router';
import * as FaIcons from 'react-icons/fa';

const Header = () => {
    const { user, logout } = useAuth();
    const { cartItems } = useCart();
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/search?q=${searchQuery}`);
        }
    };

    return (
        <header className="bg-white shadow-md">
            <nav className="container mx-auto px-6 py-3">
                <div className="flex justify-between items-center">
                    <Link href="/" legacyBehavior>
                        <a className="text-xl font-semibold text-gray-700">Hadoti Daily</a>
                    </Link>
                    <form onSubmit={handleSearch} className="relative w-full md:w-96 mx-4">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search for products..."
                            className="w-full px-4 py-2 border rounded-full"
                        />
                        <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
                            <FaIcons.FaSearch />
                        </button>
                    </form>
                    <div>
                        <Link href="/cart" legacyBehavior>
                            <a className="relative text-gray-700 hover:text-gray-900 mr-4">
                                <FaIcons.FaShoppingCart />
                                {cartItems.length > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                                        {cartItems.length}
                                    </span>
                                )}
                            </a>
                        </Link>
                        {user ? (
                            <button onClick={logout} className="text-gray-700 hover:text-gray-900">Logout</button>
                        ) : (
                            <Link href="/login" legacyBehavior>
                                <a className="text-gray-700 hover:text-gray-900">Login</a>
                            </Link>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
