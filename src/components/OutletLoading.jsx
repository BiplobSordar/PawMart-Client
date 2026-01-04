
const OutletLoader = () => {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#FF8C42] mb-3"></div>
        <p className="text-gray-600 text-sm">Loading...</p>
      </div>
    </div>
  );
};

export default OutletLoader;
