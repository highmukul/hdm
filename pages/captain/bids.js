import { useState } from 'react';
import CaptainLayout from '../../components/captain/CaptainLayout';
import BidTable from '../../components/captain/BidTable';
import BidForm from '../../components/captain/BidForm';
import { useAvailableOrders } from '../../hooks/useAvailableOrders';

const BidsPage = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { orders, loading, error } = useAvailableOrders();

  const handleSelectOrder = (order) => {
    setSelectedOrder(order);
  };

  const handleCloseForm = () => {
    setSelectedOrder(null);
  };

  if (loading) return <CaptainLayout><div>Loading...</div></CaptainLayout>;
  if (error) return <CaptainLayout><div>Error: {error.message}</div></CaptainLayout>;

  return (
    <CaptainLayout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">Bid on Orders</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <BidTable orders={orders} onSelectOrder={handleSelectOrder} selectedOrderId={selectedOrder?.id} />
          </div>
          <div>
            {selectedOrder ? (
              <BidForm order={selectedOrder} onClose={handleCloseForm} />
            ) : (
              <div className="bg-white p-6 rounded-2xl shadow-sm text-center">
                <p className="text-gray-500">Select an order to place a bid</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </CaptainLayout>
  );
};

export default BidsPage;
