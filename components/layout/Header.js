import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';
import { FaShoppingCart, FaUserCircle, FaBars, FaTimes, FaMoon, FaSun, FaBox, FaSignOutAlt } from 'react-icons/fa';
import Search from '../common/Search';
import { AnimatePresence, motion } from 'framer-motion';

const Header = () => {
  const { cartCount } = useCart();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-card-background/80 backdrop-blur-lg shadow-sm sticky top-0 z-50 border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/"><a className="text-2xl font-bold text-primary">Hadoti</a></Link>
          <div className="hidden lg:flex flex-1 justify-center px-8"><Search /></div>
          <div className="hidden lg:flex items-center space-x-2">
            <ThemeToggleButton theme={theme} toggleTheme={toggleTheme} />
            <Link href="/shop"><a className="font-semibold text-text-secondary hover:text-primary p-2 rounded-lg">Shop</a></Link>
            <UserMenu />
            <CartLink cartCount={cartCount} />
          </div>
          <div className="lg:hidden flex items-center">
            <ThemeToggleButton theme={theme} toggleTheme={toggleTheme} />
            <button onClick={() => setIsMenuOpen(true)} className="ml-2"><FaBars size={24}/></button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isMenuOpen && <MobileMenu closeMenu={() => setIsMenuOpen(false)} />}
      </AnimatePresence>
    </header>
  );
};

const UserMenu = () => {
    const { user, logout } = useAuth();
    return user ? (
        <div className="relative">
            <Link href="/profile"><a className="p-2 rounded-full hover:bg-background"><FaUserCircle size={24}/></a></Link>
            {/* A full dropdown could be implemented here */}
        </div>
    ) : <AuthButtons />;
};

const AuthButtons = () => (
    <>
        <Link href="/login"><a className="font-semibold text-text-secondary hover:text-primary p-2 rounded-lg">Login</a></Link>
        <Link href="/signup"><a className="btn-primary ml-2">Sign Up</a></Link>
    </>
);

const CartLink = ({ cartCount }) => (
    <Link href="/cart">
        <a className="relative p-2 rounded-full hover:bg-background">
            <FaShoppingCart size={24}/>
            {cartCount > 0 && <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-secondary rounded-full">{cartCount}</span>}
        </a>
    </Link>
);

const ThemeToggleButton = ({ theme, toggleTheme }) => (
    <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-background">{theme === 'light' ? <FaMoon size={20}/> : <FaSun size={20}/>}</button>
);

const MobileMenu = ({ closeMenu }) => {
    const { user, logout } = useAuth();
    const { cartCount } = useCart();
    return (
        <motion.div 
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-full max-w-sm bg-card-background shadow-2xl z-50 p-6 flex flex-col"
        >
            <div className="flex justify-between items-center mb-10">
                <h2 className="text-xl font-bold">Menu</h2>
                <button onClick={closeMenu}><FaTimes size={24}/></button>
            </div>
            <div className="flex-grow">
                <Link href="/shop"><a className="flex items-center p-4 text-lg font-semibold hover:bg-background rounded-lg"><FaBox className="mr-4"/>Shop</a></Link>
                <Link href="/cart"><a className="flex items-center p-4 text-lg font-semibold hover:bg-background rounded-lg"><FaShoppingCart className="mr-4"/>Cart ({cartCount})</a></Link>
                {user && <Link href="/profile"><a className="flex items-center p-4 text-lg font-semibold hover:bg-background rounded-lg"><FaUserCircle className="mr-4"/>Profile</a></Link>}
            </div>
            <div className="mt-auto">
                {user ? <button onClick={logout} className="w-full flex items-center p-4 text-lg font-semibold hover:bg-background rounded-lg text-red-500"><FaSignOutAlt className="mr-4"/>Logout</button> : <AuthButtons />}
            </div>
        </motion.div>
    );
};

export default Header;
