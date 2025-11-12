import React from "react";

const ProductDetailSkeleton = () => {
  return (
    <div className="min-h-screen px-4 md:px-8 py-10 bg-gray-50 animate-pulse">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
      
        <div className="w-full h-96 bg-gray-300 rounded-2xl"></div>


        <div className="flex flex-col space-y-4">
          <div className="h-8 bg-gray-300 w-3/4 rounded"></div>
          <div className="h-6 bg-gray-300 w-1/4 rounded"></div>
          <div className="h-6 bg-gray-300 w-1/3 rounded"></div>
          <div className="h-6 bg-gray-300 w-1/2 rounded"></div>
          <div className="flex gap-4 mt-4">
            <div className="h-12 bg-gray-300 flex-1 rounded"></div>
            <div className="h-12 bg-gray-300 flex-1 rounded"></div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-10 space-y-3">
        <div className="h-6 w-1/4 bg-gray-300 rounded"></div>
        <div className="h-4 bg-gray-300 rounded"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      </div>
    </div>
  );
};

export default ProductDetailSkeleton;
