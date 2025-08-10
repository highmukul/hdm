import { useState } from 'react';
import CaptainLayout from '../../components/captain/CaptainLayout';
import OrderMap from '../../components/captain/OrderMap';
import OrderQueue from '../../components/captain/OrderQueue';
import * as FiIcons from 'react-icons/fi';
import { useAvailableOrders } from '../../hooks/useAvailableOrders';

const CaptainDashboard = () => {
    const [view, setView] = useState('queue'); // 'queue' or 'map'
    const { orders, loading, error } = useAvailableOrders();

    return (
        <CaptainLayout>
            <div className="p-4">
                <div className="flex justify-end mb-4">
                    <button onClick={() => setView('queue')} className={`px-4 py-2 rounded-l-lg ${view === 'queue' ? 'bg-blue-600 text-white' : 'bg-white'}`}><FiIcons.FiList className="inline-block mr-2" />Queue</button>
                    <button onClick={() => setView('map')} className={`px-4 py-2 rounded-r-lg ${view === 'map' ? 'bg-blue-600 text-white' : 'bg-white'}`}><FiIcons.FiMap className="inline-block mr-2" />Map</button>
                </div>
                
                {view === 'map' ? <OrderMap orders={orders} /> : <OrderQueue orders={orders} loading={loading} error={error} />}
            </div>
        </CaptainLayout>
    );
};

export default CaptainDashboard;
