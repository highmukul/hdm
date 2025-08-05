import { useState } from 'react';

const FilterSidebar = ({ filters, onFilterChange }) => {
    const [price, setPrice] = useState(500);

    return (
        <aside className="w-64 p-4">
            <h3 className="text-xl font-semibold mb-4">Filters</h3>
            <div className="space-y-6">
                <div>
                    <h4 className="font-semibold mb-2">Price Range</h4>
                    <input
                        type="range"
                        min="0"
                        max="1000"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full"
                    />
                    <div className="flex justify-between text-sm">
                        <span>₹0</span>
                        <span>₹{price}</span>
                    </div>
                </div>
                <div>
                    <h4 className="font-semibold mb-2">Brands</h4>
                    <div className="space-y-2">
                        {['Brand A', 'Brand B', 'Brand C'].map(brand => (
                            <label key={brand} className="flex items-center">
                                <input type="checkbox" className="mr-2" />
                                {brand}
                            </label>
                        ))}
                    </div>
                </div>
                <div>
                    <h4 className="font-semibold mb-2">Categories</h4>
                    <div className="space-y-2">
                        {['Flour', 'Rice', 'Oil'].map(category => (
                            <label key={category} className="flex items-center">
                                <input type="checkbox" className="mr-2" />
                                {category}
                            </label>
                        ))}
                    </div>
                </div>
                <div>
                    <h4 className="font-semibold mb-2">Sort By</h4>
                    <select className="w-full p-2 border rounded-lg">
                        <option>Popularity</option>
                        <option>Price Low to High</option>
                        <option>Newest</option>
                    </select>
                </div>
            </div>
        </aside>
    );
};

export default FilterSidebar;
