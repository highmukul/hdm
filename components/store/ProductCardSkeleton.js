export const ProductCardSkeleton = () => {
    return (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
            <div className="w-full h-48 bg-gray-300 animate-pulse"></div>
            <div className="p-4">
                <div className="h-6 bg-gray-300 rounded w-3/4 mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2 animate-pulse"></div>
            </div>
        </div>
    );
};
