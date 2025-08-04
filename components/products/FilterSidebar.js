const FilterSidebar = ({ filters, setFilters }) => {
    const handleCategoryChange = (e) => {
      setFilters(prev => ({ ...prev, category: e.target.value }));
    };
  
    const handleSortChange = (e) => {
      setFilters(prev => ({ ...prev, sortBy: e.target.value }));
    };
  
    // In a real app, categories would be fetched from your backend
    const categories = ['All', 'Vegetables & Fruits', 'Dairy & Breakfast', 'Munchies', 'Cold Drinks & Juices'];
  
    return (
      <aside className="w-64 p-6 bg-white rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-6">Filters</h3>
        
        {/* Category Filter */}
        <div className="mb-8">
          <h4 className="font-semibold mb-4">Category</h4>
          <div className="space-y-2">
            {categories.map(cat => (
              <label key={cat} className="flex items-center">
                <input
                  type="radio"
                  name="category"
                  value={cat}
                  checked={filters.category === cat}
                  onChange={handleCategoryChange}
                  className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                />
                <span className="ml-3 text-sm text-gray-600">{cat}</span>
              </label>
            ))}
          </div>
        </div>
  
        {/* Sort By */}
        <div>
          <h4 className="font-semibold mb-4">Sort By</h4>
          <select 
            value={filters.sortBy} 
            onChange={handleSortChange}
            className="w-full p-2 border rounded-md"
          >
            <option value="default">Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </aside>
    );
  };
  
  export default FilterSidebar;