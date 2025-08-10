import CaptainLayout from '../../components/captain/CaptainLayout';
import HistoryTable from '../../components/captain/HistoryTable';
import { useCompletedOrders } from '../../hooks/useCompletedOrders';

const HistoryPage = () => {
    const { orders, loading, error } = useCompletedOrders();

    if (loading) return <CaptainLayout><div>Loading...</div></CaptainLayout>;
    if (error) return <CaptainLayout><div>Error: {error.message}</div></CaptainLayout>;

    return (
        <CaptainLayout>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-2xl font-bold text-gray-800 mb-8">My Order History</h1>
                <HistoryTable orders={orders} />
            </div>
        </CaptainLayout>
    );
};

export default HistoryPage;
