import { useState } from 'react';
import CaptainLayout from '../../components/captain/CaptainLayout';
import OrderMap from '../../components/captain/OrderMap';
import OrderQueue from '../../components/captain/OrderQueue';
import withCaptainProfile from '../../components/hoc/withCaptainProfile';
import { FiMap, FiList } from 'react-icons/fi';

const CaptainDashboardPage = () => {
    const [activeTab, setActiveTab] = useState('map');

    return (
        <CaptainLayout>
            <div className="p-4">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Captain Dashboard</h1>
                    <p className="text-gray-500">Welcome back! Here are the available orders.</p>
                </div>

                {/* Tab Controls */}
                <div className="flex justify-center mb-6">
                    <div className="flex items-center bg-gray-200 rounded-full p-1">
                        <button 
                            onClick={() => setActiveTab('map')}
                            className={`px-6 py-2 text-sm font-semibold rounded-full transition-colors ${activeTab === 'map' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'}`}
                        >
                            <FiMap className="inline mr-2" /> Map View
                        </button>
                        <button 
                            onClick={() => setActiveTab('list')}
                            className={`px-6 py-2 text-sm font-semibold rounded-full transition-colors ${activeTab === 'list' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'}`}
                        >
                            <FiList className="inline mr-2" /> List View
                        </button>
                    </div>
                </div>

                {/* Content based on active tab */}
                <div>
                    {activeTab === 'map' && <OrderMap />}
                    {activeTab === 'list' && <OrderQueue />}
                </div>
            </div>
        </CaptainLayout>
    );
};

export default withCaptainProfile(CaptainDashboardPage);
