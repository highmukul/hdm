import Link from 'next/link';
import { FaTachometerAlt, FaBoxOpen, FaUserCircle } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const CaptainLayout = ({ children }) => {
    const { user, logout } = useAuth();

    const captainNavLinks = [
        { name: 'Dashboard', icon: <FaTachometerAlt />, href: '/captain/dashboard' },
        { name: 'My Deliveries', icon: <FaBoxOpen />, href: '/captain/deliveries' },
        { name: 'Profile', icon: <FaUserCircle />, href: '/captain/profile' },
    ];

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-900 text-white flex flex-col">
                <div className="h-20 flex items-center justify-center text-2xl font-bold">
                    Captain Portal
                </div>
                <nav className="flex-1 px-4 py-8">
                    <ul>
                        {captainNavLinks.map(link => (
                            <li key={link.name} className="mb-4">
                                <Link href={link.href}>
                                    <a className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition-colors">
                                        <span className="mr-4">{link.icon}</span>
                                        {link.name}
                                    </a>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="p-4 border-t border-gray-800">
                  <button onClick={logout} className="w-full text-left p-3 rounded-lg hover:bg-red-700 transition-colors">
                    Logout
                  </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="h-20 bg-white shadow-md flex items-center justify-between px-8">
                    <h1 className="text-xl font-semibold">Welcome, {user?.name || 'Captain'}!</h1>
                </header>
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-8">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default CaptainLayout;