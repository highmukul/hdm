import { useState, useMemo } from 'react';
import useAdminData from '../../hooks/useAdminData';

const OrderTable = () => {
    const { data: orders, loading, error } = useAdminData('orders');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: 'orderId', direction: 'desc' });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const filteredOrders = useMemo(() => {
        return orders.filter(order => 
            order.orderId.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [orders, searchTerm]);
    
    const sortedOrders = useMemo(() => {
        let sortableOrders = [...filteredOrders];
        if (sortConfig.key) {
            sortableOrders.sort((a, b) => {
                const aValue = sortConfig.key === 'createdAt' ? a.createdAt.seconds : a[sortConfig.key];
                const bValue = sortConfig.key === 'createdAt' ? b.createdAt.seconds : b[sortConfig.key];
                
                if (aValue < bValue) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
                if (aValue > bValue) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableOrders;
    }, [filteredOrders, sortConfig]);

    const paginatedOrders = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return sortedOrders.slice(startIndex, startIndex + itemsPerPage);
    }, [sortedOrders, currentPage]);

     const requestSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    if (loading) return <p>Loading orders...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
             <input
                type="text"
                placeholder="Search by Order ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-4 p-2 border rounded w-full dark:bg-gray-700"
            />
            <table className="w-full text-left">
                <thead>
                    <tr>
                        <th onClick={() => requestSort('orderId')} className="cursor-pointer">Order ID</th>
                        <th onClick={() => requestSort('createdAt')} className="cursor-pointer">Date</th>
                        <th onClick={() => requestSort('total')} className="cursor-pointer">Amount</th>
                        <th onClick={() => requestSort('status')} className="cursor-pointer">Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedOrders.map(order => (
                        <tr key={order.id} className="border-b dark:border-gray-700">
                            <td>{order.orderId}</td>
                            <td>{new Date(order.createdAt.seconds * 1000).toLocaleDateString()}</td>
                            <td>₹{order.total.toFixed(2)}</td>
                            <td>{order.status}</td>
                            <td>
                                <button className="text-blue-500">View</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrderTable;
