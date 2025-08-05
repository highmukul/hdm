import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthContext';
import { FaTachometerAlt, FaBoxOpen, FaUsers, FaCog, FaTags, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
import Link from 'next/link';
import toast from 'react-hot-toast';

const AdminLayout = ({ children }) => {
  const router = useRouter();
  const { user, logout, loading } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user?.isAdmin) {
      toast.error("You don't have permission to access this page.");
      router.push('/login');
    }
  }, [user, loading, router]);

  const adminNavLinks = [
    { name: 'Dashboard', icon: <FaTachometerAlt />, href: '/admin/dashboard' },
    { name: 'Products', icon: <FaBoxOpen />, href: '/admin/products' },
    { name: 'Categories', icon: <FaTags />, href: '/admin/categories' },
    { name: 'Users', icon: <FaUsers />, href: '/admin/users' },
    { name: 'Settings', icon: <FaCog />, href: '/admin/settings' },
  ];

  const SidebarContent = () => (
    <>
      <div className="h-20 flex items-center justify-center text-2xl font-bold text-white border-b border-gray-800">
        Admin
      </div>
      <nav className="flex-1 px-4 py-8">
        <ul>
          {adminNavLinks.map(link => (
            <li key={link.name} className="mb-2">
              <Link href={link.href}>
                <a className={`flex items-center p-3 rounded-lg transition-colors ${router.pathname === link.href ? 'bg-indigo-600 text-white' : 'hover:bg-gray-800'}`}>
                  <span className="mr-4 text-lg">{link.icon}</span>
                  {link.name}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </nav >
      <div className="p-4 border-t border-gray-800">
        <button onClick={logout} className="w-full flex items-center p-3 rounded-lg text-left hover:bg-red-800 transition-colors">
          <FaSignOutAlt className="mr-4" /> Logout
        </button>
      </div>
    </ >
  );

  if (loading || !user?.isAdmin) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <p className="text-gray-600">Verifying access...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      <div className={`fixed inset-0 bg-gray-900 text-gray-200 flex flex-col z-50 transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:hidden`}>
        <SidebarContent />
      </div>

      <aside className="w-64 bg-gray-900 text-gray-200 flex-col hidden md:flex">
        <SidebarContent />
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-20 bg-white shadow-sm flex items-center justify-between px-4 md:px-8 border-b">
          <button className="md:hidden" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
          <h1 className="text-xl md:text-2xl font-semibold text-gray-800">Admin Panel</h1>
          <div className="text-right">
            <p className="font-semibold text-gray-800">{user?.name}</p>
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
