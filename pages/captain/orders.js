import { useState } from 'react';
import CaptainLayout from '../../components/captain/CaptainLayout';
import AssignedOrderTable from '../../components/captain/AssignedOrderTable';
import AssignedOrderDetails from '../../components/captain/AssignedOrderDetails';
import { useAssignedOrders } from '../../hooks/useAssignedOrders';

const OrdersPage = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { orders, loading, error } = useAssignedOrders();

  const handleSelectOrder = (order) => {
    setSelectedOrder(order);
  };

  const handleCloseDetails = () => {
    setSelectedOrder(null);
  };

  if (loading) return <CaptainLayout><div>Loading...</div></CaptainLayout>;
  if (error) return <CaptainLayout><div>Error: {error.message}</div></CaptainLayout>;

  return (
    <CaptainLayout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">My Orders</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <AssignedOrderTable orders={orders} onSelectOrder={handleSelectOrder} selectedOrderId={selectedOrder?.id} />
          </div>
          <div>
            {selectedOrder ? (
              <AssignedOrderDetails order={selectedOrder} onClose={handleCloseDetails} />
            ) : (
              <div className="bg-white p-6 rounded-2xl shadow-sm text-center">
                <p className="text-gray-500">Select an order to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </CaptainLayout>
  );
};

export default OrdersPage;
