export const StoreCardSkeleton = () => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
            <div className="p-4 flex items-center animate-pulse">
                <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
                </div>
                <div className="ml-4 w-full">
                    <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                </div>
            </div>
        </div>
    );
};
