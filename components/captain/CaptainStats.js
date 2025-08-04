import { FaShippingFast, FaRupeeSign, FaStar } from 'react-icons/fa';

// This would be fetched from a hook in a real app
const dummyStats = {
  deliveries: 42,
  earnings: 12500,
  rating: 4.8,
};

const StatCard = ({ icon, title, value, color }) => (
    <div className={`p-6 rounded-lg shadow-lg text-white ${color}`}>
        <div className="flex items-center">
            <div className="text-3xl">{icon}</div>
            <div className="ml-4">
                <p className="text-lg">{title}</p>
                <p className="text-3xl font-bold">{value}</p>
            </div>
        </div>
    </div>
);

const CaptainStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard 
        icon={<FaShippingFast />} 
        title="Completed Deliveries" 
        value={dummyStats.deliveries} 
        color="bg-blue-500"
      />
      <StatCard 
        icon={<FaRupeeSign />} 
        title="Total Earnings" 
        value={`₹${dummyStats.earnings.toLocaleString()}`}
        color="bg-green-500"
      />
      <StatCard 
        icon={<FaStar />} 
        title="Your Rating" 
        value={dummyStats.rating.toFixed(1)}
        color="bg-yellow-500"
      />
    </div>
  );
};

export default CaptainStats;