import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';
import { useRouter } from 'next/router';
import * as FaIcons from 'react-icons/fa';
import * as FiIcons from 'react-icons/fi';

const Header = () => {
    const { user, logout } = useAuth();
    const { cartItems } = useCart();
    const { theme, toggleTheme } = useTheme();
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/search?q=${searchQuery}`);
        }
    };

    return (
        <header className="bg-surface-light dark:bg-surface-dark shadow-md">
            <nav className="container mx-auto px-6 py-3">
                <div className="flex justify-between items-center">
                    <Link href="/" className="text-xl font-semibold text-on-surface-light dark:text-on-surface-dark">
                        Hadoti Daily
                    </Link>
                    <form onSubmit={handleSearch} className="relative w-full md:w-96 mx-4">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search for products..."
                            className="w-full px-4 py-2 border rounded-full bg-background-light dark:bg-background-dark text-on-background-light dark:text-on-background-dark"
                        />
                        <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
                            <FaIcons.FaSearch className="text-on-background-light dark:text-on-background-dark"/>
                        </button>
                    </form>
                    <div className="flex items-center">
                        <button onClick={toggleTheme} className="mr-4 text-2xl text-on-surface-light dark:text-on-surface-dark">
                            {theme === 'light' ? <FiIcons.FiMoon /> : <FiIcons.FiSun />}
                        </button>
                        <Link href="/cart" className="relative text-on-surface-light dark:text-on-surface-dark hover:text-gray-900 mr-4">
                                <FaIcons.FaShoppingCart />
                                {cartItems.length > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                                        {cartItems.length}
                                    </span>
                                )}
                        </Link>
                        {user ? (
                            <button onClick={logout} className="text-on-surface-light dark:text-on-surface-dark hover:text-gray-900">Logout</button>
                        ) : (
                            <Link href="/login" className="text-on-surface-light dark:text-on-surface-dark hover:text-gray-900">
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
