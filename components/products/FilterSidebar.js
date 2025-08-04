import { useState, useEffect } from 'react';

const categories = [
  'All', 
  'Vegetables & Fruits', 
  'Dairy & Breakfast', 
  'Munchies', 
  'Cold Drinks & Juices',
  'Instant & Frozen Food',
  'Tea, Coffee & Health Drinks',
  'Bakery & Biscuits'
];

const sortOptions = [
  { value: 'name_asc', label: 'Alphabetical (A-Z)' },
  { value: 'name_desc', label: 'Alphabetical (Z-A)' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
];

const FilterSidebar = ({ filters, onFilterChange }) => {
  const [internalFilters, setInternalFilters] = useState(filters);

  useEffect(() => {
    onFilterChange(internalFilters);
  }, [internalFilters, onFilterChange]);

  const handleCategoryChange = (category) => {
    setInternalFilters(prev => ({ ...prev, category }));
  };

  const handleSortChange = (e) => {
    setInternalFilters(prev => ({ ...prev, sortBy: e.target.value }));
  };

  return (
    <div className="space-y-8">
      {/* Category Filter */}
      <div>
        <h4 className="font-semibold mb-4 text-gray-800">Category</h4>
        <div className="space-y-3">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                internalFilters.category === cat
                  ? 'bg-green-100 text-green-700 font-semibold'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Sort By */}
      <div>
        <h4 className="font-semibold mb-4 text-gray-800">Sort By</h4>
        <select
          value={internalFilters.sortBy}
          onChange={handleSortChange}
          className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-green-500 focus:outline-none"
        >
          {sortOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterSidebar;
