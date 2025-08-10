import Link from 'next/link';
import { useRouter } from 'next/router';
import * as FaIcons from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const CaptainLayout = ({ children }) => {
    const router = useRouter();
    const { logout } = useAuth();

    const navLinks = [
        { name: 'Dashboard', icon: <FaIcons.FaTachometerAlt />, href: '/captain/dashboard' },
        { name: 'Available Orders', icon: <FaIcons.FaBoxOpen />, href: '/captain/home' },
        { name: 'My Profile', icon: <FaIcons.FaUserCircle />, href: '/captain/profile' },
    ];

    return (
        <div className="flex h-screen bg-gray-100">
            <aside className="w-64 bg-gray-800 text-white flex flex-col">
                <div className="h-20 flex items-center justify-center text-2xl font-bold">Captain</div>
                <nav className="flex-1 px-4">
                    <ul>
                        {navLinks.map(link => (
                            <li key={link.name}>
                                <Link href={link.href} legacyBehavior>
                                    <a className={`flex items-center p-3 my-2 rounded-lg ${router.pathname === link.href ? 'bg-blue-600' : 'hover:bg-gray-700'}`}>
                                        <span className="mr-3">{link.icon}</span>
                                        {link.name}
                                    </a>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="p-4">
                    <button onClick={logout} className="w-full bg-red-600 p-3 rounded-lg flex items-center justify-center hover:bg-red-700">
                        Logout
                    </button>
                </div>
            </aside>
            <main className="flex-1 overflow-y-auto">
                {children}
            </main>
        </div>
    );
};

export default CaptainLayout;
