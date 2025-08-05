import { useState } from 'react';

const categories = [
    'Grocery', 'Snacks & Beverages', 'Vegetables & Fruits', 'Dairy & Bakery',
    'Household', 'Personal Care', 'Offers'
];

export const CategoryNav = () => {
    const [selectedCategory, setSelectedCategory] = useState('Grocery');

    return (
        <div className="bg-white shadow-md">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex overflow-x-auto py-3">
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-4 py-2 text-sm font-semibold rounded-full whitespace-nowrap transition-colors ${
                                selectedCategory === category
                                    ? 'bg-blue-600 text-white'
                                    : 'text-gray-600 hover:bg-gray-100'
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};
