import React from "react";

const ProductCardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden animate-pulse flex flex-col">

      <div className="relative w-full h-48 sm:h-52 md:h-56 lg:h-60 xl:h-64 2xl:h-72 bg-gray-200" />


      <div className="p-3 sm:p-4 md:p-5 flex flex-col space-y-2 sm:space-y-3">

        <div className="h-5 sm:h-6 bg-gray-200 rounded w-3/4" />


        <div className="flex justify-between items-center">
          <div className="h-4 bg-gray-200 rounded w-1/3" />
          <div className="h-4 bg-gray-200 rounded w-1/3" />
        </div>


        <div className="flex justify-center mt-2">
          <div className="h-8 sm:h-9 bg-gray-200 rounded-lg w-1/2" />
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
