import Image from 'next/image';
import { FiStar } from 'react-icons/fi';
import { getDistance } from '../../utils/getDistance';

export const StoreCard = ({ store, userLocation }) => {
    const distance = userLocation ? getDistance(userLocation, store.location) : null;
    const status = store.isOpen ? 'Open' : 'Closed';

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">
            <div className="p-4 flex items-center">
                <div className="flex-shrink-0">
                    <Image src={store.logoUrl} alt={`${store.name} logo`} width={64} height={64} className="rounded-full object-cover" />
                </div>
                <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-800">{store.name}</h3>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                        <FiStar className="text-yellow-500 mr-1" />
                        <span>{store.rating}</span>
                        {distance && <span className="mx-2">|</span>}
                        {distance && <span>{distance.toFixed(1)} km away</span>}
                    </div>
                    <div className={`text-sm font-semibold mt-2 ${status === 'Open' ? 'text-green-600' : 'text-red-600'}`}>
                        {status}
                    </div>
                </div>
            </div>
        </div>
    );
};
