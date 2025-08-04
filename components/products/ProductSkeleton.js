const ProductSkeleton = () => {
    return (
      <div className="border border-gray-200 rounded-lg p-4 max-w-sm w-full mx-auto">
        <div className="animate-pulse flex flex-col space-y-4">
          <div className="rounded bg-gray-300 h-48 w-full"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          </div>
          <div className="h-10 bg-gray-300 rounded w-full"></div>
        </div>
      </div>
    );
  };
  
  export default ProductSkeleton;