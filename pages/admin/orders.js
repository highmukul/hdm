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

  if (loading) return <AdminLayout><div>Loading...</div></AdminLayout>;
  if (error) return <AdminLayout><div>Error: {error.message}</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">Order Management</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <OrderTable orders={orders} onSelectOrder={handleSelectOrder} selectedOrderId={selectedOrder?.id} />
          </div>
          <div>
            {selectedOrder ? (
              <OrderDetails order={selectedOrder} onClose={handleCloseDetails} />
            ) : (
              <div className="bg-white p-6 rounded-2xl shadow-sm text-center">
                <p className="text-gray-500">Select an order to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminOrdersPage;
