import * as FaIcons from 'react-icons/fa';

const features = [
    { name: 'Fresh Produce', description: 'Direct from local farms to your table.', icon: <FaIcons.FaLeaf /> },
    { name: 'Fast Delivery', description: 'Get your order in minutes, not hours.', icon: <FaIcons.FaShippingFast /> },
    { name: 'Happy Customers', description: 'Join thousands of satisfied shoppers.', icon: <FaIcons.FaSmile /> },
];

const Features = () => {
    return (
        <div className="bg-gray-50 dark:bg-gray-800 py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    {features.map(feature => (
                        <div key={feature.name} className="p-6">
                            <div className="flex items-center justify-center h-16 w-16 mx-auto bg-blue-100 text-blue-600 rounded-full text-3xl">
                                {feature.icon}
                            </div>
                            <h3 className="mt-5 text-xl font-bold text-on-background-light dark:text-on-background-dark">{feature.name}</h3>
                            <p className="mt-2 text-gray-600 dark:text-gray-400">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Features;
