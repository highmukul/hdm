import * as FaIcons from 'react-icons/fa';

const CaptainStats = ({ stats }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
                <FaIcons.FaShippingFast className="text-4xl text-blue-500 mr-4" />
                <div>
                    <div className="text-gray-500">Orders Delivered</div>
                    <div className="text-2xl font-bold">{stats.ordersDelivered}</div>
                </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
                <FaIcons.FaRupeeSign className="text-4xl text-green-500 mr-4" />
                <div>
                    <div className="text-gray-500">Total Earnings</div>
                    <div className="text-2xl font-bold">₹{stats.totalEarnings.toFixed(2)}</div>
                </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
                <FaIcons.FaStar className="text-4xl text-yellow-500 mr-4" />
                <div>
                    <div className="text-gray-500">Your Rating</div>
                    <div className="text-2xl font-bold">{stats.rating.toFixed(1)}</div>
                </div>
            </div>
        </div>
    );
};

export default CaptainStats;
