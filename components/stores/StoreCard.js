import Link from 'next/link';
import Image from 'next/image';
import * as FiIcons from 'react-icons/fi';

const StoreCard = ({ store }) => {
    return (
        <Link href={`/stores/${store.id}`} legacyBehavior>
            <a className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative h-40">
                    <Image src={store.imageUrl} alt={store.name} layout="fill" objectFit="cover" />
                </div>
                <div className="p-4">
                    <h3 className="text-lg font-bold">{store.name}</h3>
                    <p className="text-gray-600">{store.category}</p>
                    <div className="flex items-center mt-2">
                        <span className="text-yellow-500 flex items-center"><FiIcons.FiStar className="mr-1" /> {store.rating}</span>
                        <span className="text-gray-400 mx-2">•</span>
                        <span className="text-gray-600">{store.deliveryTime} mins</span>
                    </div>
                </div>
            </a>
        </Link>
    );
};

export default StoreCard;
