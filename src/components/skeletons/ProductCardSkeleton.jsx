import React from "react";

const ProductCardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl shadow-md flex flex-col w-[220px] h-[350px] animate-pulse">
 
      <div className="relative w-full h-[180px] bg-gray-200 rounded-t-2xl">
   
        <div className="absolute top-2 left-2 w-20 h-5 bg-[#FF8C42] rounded-full" />
      
        <div className="absolute top-2 right-2 w-20 h-5 bg-green-500 rounded-full" />
      </div>

  
      <div className="p-3 flex flex-col gap-2 flex-1">
 
        <div className="h-5 sm:h-6 bg-gray-200 rounded w-3/4" />

        <div className="h-4 bg-gray-200 rounded w-1/2" />

       
        <div className="flex justify-between items-center">
          <div className="h-4 bg-gray-200 rounded w-1/3" />
          <div className="h-4 bg-gray-200 rounded w-1/3" />
        </div>


        <div className="flex justify-center mt-3">
          <div className="h-8 sm:h-9 bg-gray-200 rounded-lg w-1/2" />
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
