import Link from 'next/link';

const TopProducts = ({ products }) => {
    return (
        <ul className="divide-y divide-gray-200">
            {products.map(product => (
                <li key={product.id} className="py-4 flex items-center justify-between">
                    <div className="flex items-center">
                        <img className="h-10 w-10 rounded-full object-cover" src={product.imageUrl} alt={product.name} />
                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">{product.name}</p>
                            <p className="text-sm text-gray-500">{product.category}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">₹{product.price.toFixed(2)}</p>
                        <p className="text-sm text-gray-500">{product.sales} sales</p>
                    </div>
                    <div className="ml-4">
                        <Link href={`/admin/products/${product.id}`} className="text-indigo-600 hover:text-indigo-900">
                            View
                        </Link>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default TopProducts;
