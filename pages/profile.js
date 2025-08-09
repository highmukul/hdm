import { useState } from 'react';
import Layout from '../components/layout/Layout';
import { useAuth } from '../context/AuthContext';
import { FiUser, FiShoppingBag, FiMapPin, FiHelpCircle, FiFileText, FiLogOut } from 'react-icons/fi';
import UserProfile from '../components/profile/UserProfile';
import ManageAddresses from '../components/profile/ManageAddresses';
import OrderHistory from '../components/profile/OrderHistory';
import StaticContent from '../components/profile/StaticContent';
import ProtectedRoute from '../components/ui/ProtectedRoute';

const ProfilePage = () => {
    const { user, logout } = useAuth();
    const [activeTab, setActiveTab] = useState('profile');

    const tabs = {
        profile: { label: 'My Profile', icon: <FiUser />, component: <UserProfile /> },
        orders: { label: 'My Orders', icon: <FiShoppingBag />, component: <OrderHistory /> },
        addresses: { label: 'My Addresses', icon: <FiMapPin />, component: <ManageAddresses /> },
        support: { label: 'Support', icon: <FiHelpCircle />, component: <StaticContent page="support" /> },
        terms: { label: 'Terms & Conditions', icon: <FiFileText />, component: <StaticContent page="terms" /> },
    };

    return (
        <ProtectedRoute>
            <Layout>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {/* Sidebar Navigation */}
                        <aside className="md:col-span-1">
                            <div className="bg-white p-5 rounded-2xl shadow-sm">
                                <div className="text-center mb-6">
                                    <h2 className="text-xl font-bold text-gray-800">{user?.displayName || 'User'}</h2>
                                    <p className="text-sm text-gray-500">{user?.email}</p>
                                </div>
                                <nav className="space-y-2">
                                    {Object.keys(tabs).map(key => (
                                        <button 
                                            key={key}
                                            onClick={() => setActiveTab(key)} 
                                            className={`w-full flex items-center p-3 rounded-lg text-left text-sm font-medium transition-colors ${
                                                activeTab === key 
                                                ? 'bg-blue-100 text-blue-700' 
                                                : 'text-gray-600 hover:bg-gray-100'
                                            }`}
                                        >
                                            <span className="mr-3 text-lg">{tabs[key].icon}</span>
                                            {tabs[key].label}
                                        </button>
                                    ))}
                                    <button 
                                        onClick={logout} 
                                        className="w-full flex items-center p-3 rounded-lg text-left text-sm font-medium text-red-600 hover:bg-red-50"
                                    >
                                        <FiLogOut className="mr-3 text-lg" />
                                        Logout
                                    </button>
                                </nav>
                            </div>
                        </aside>

                        {/* Main Content */}
                        <main className="md:col-span-3">
                            <div className="bg-white p-8 rounded-2xl shadow-sm min-h-[400px]">
                                {tabs[activeTab].component}
                            </div>
                        </main>
                    </div>
                </div>
            </Layout>
        </ProtectedRoute>
    );
};

export default ProfilePage;
