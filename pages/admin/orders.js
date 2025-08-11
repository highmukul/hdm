import { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import OrderTable from '../../components/admin/OrderTable';
import OrderDetails from '../../components/admin/OrderDetails';
import useAdminData from '../../hooks/useAdminData';

const AdminOrdersPage = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { data: orders, loading, error } = useAdminData('orders');

  const handleSelectOrder = (order) => {
    setSelectedOrder(order);
  };

  const handleCloseDetails = () => {
    setSelectedOrder(null);
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold text-gray-800">Order Management</h1>
        <div className="bg-white p-8 rounded-xl shadow-md">
          {loading && <p>Loading orders...</p>}
          {error && <p className="text-red-500">{error.message}</p>}
          {!loading && !error && (
            <OrderTable orders={orders} onSelectOrder={handleSelectOrder} selectedOrderId={selectedOrder?.id} />
          )}
        </div>
        {selectedOrder && (
          <div className="bg-white p-8 rounded-xl shadow-md">
            <OrderDetails order={selectedOrder} onClose={handleCloseDetails} />
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminOrdersPage;
