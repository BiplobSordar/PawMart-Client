import React, { useState } from "react";
import { MapPin, DollarSign, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ item }) => {
  const navigate = useNavigate();
  const [imgError, setImgError] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl hover:scale-[1.02] transition-transform duration-300 flex flex-col">

      <div className="relative w-full h-48 sm:h-52 md:h-56 lg:h-60 xl:h-64 2xl:h-72 overflow-hidden bg-gray-100 flex items-center justify-center">
        {!imgError ? (
          <img
            src={item.image || '/pet1.jpg'}
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400 font-semibold">
            Image Not Available
          </div>
        )}

     
        {item.category && (
          <div className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-[#FF8C42] text-white text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full shadow-md">
            {item.category}
          </div>
        )}

    
        {item.sell && (
          <div className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-yellow-400 text-white p-1 sm:p-2 rounded-full shadow-md">
            <ShoppingCart size={16} />
          </div>
        )}
      </div>

      <div className="p-3 sm:p-4 md:p-5 flex flex-col space-y-2 sm:space-y-3">
        <h3 className="text-base sm:text-lg md:text-lg lg:text-xl font-bold text-gray-800 line-clamp-1">
          {item.name}
        </h3>

        <div className="flex justify-between items-center text-xs sm:text-sm md:text-sm lg:text-base text-gray-600">
          <div className="flex items-center gap-1 sm:gap-2">
            <DollarSign size={14} className="text-primary sm:text-[16px]" />
            <span>{item.price || "Free for Adoption"}</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <MapPin size={14} className="text-primary sm:text-[16px]" />
            <span>{item.location}</span>
          </div>
        </div>

       
        <div className="flex justify-center mt-2">
          <button
            onClick={() => navigate(`/listing/${item.id}`)}
            className="bg-primary text-white font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:bg-accent transition-colors text-sm sm:text-base md:text-base"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
