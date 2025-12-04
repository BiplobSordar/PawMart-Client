import React, { useState } from "react";
import { MapPin, DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ item }) => {
  const navigate = useNavigate();
  const [imgError, setImgError] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow transform hover:scale-[1.03] flex flex-col w-full sm:w-[220px]">
   
      <div className="relative w-full h-[180px] sm:h-[200px] md:h-[220px] lg:h-[240px] bg-gray-100 flex items-center justify-center overflow-hidden rounded-t-2xl">
        <img
          src={!imgError ? item.image || "/dummy-pet.jpg" : "/dummy-pet.jpg"}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          onError={() => setImgError(true)}
        />

    
        {item.category && (
          <div className="absolute top-2 left-2 bg-[#FF8C42] text-white text-[10px] sm:text-xs md:text-sm px-2 py-1 rounded-full shadow-md max-w-[80px] truncate">
            {item.category?.name}
          </div>
        )}

        
        {item.isPet && (
          <div
            className={`absolute top-2 right-2 px-2 py-1 rounded-full text-[10px] sm:text-xs md:text-sm font-semibold shadow-md max-w-[80px] truncate ${
              item.adoptionStatus === "available"
                ? "bg-green-500 text-white"
                : "bg-gray-400 text-white"
            }`}
          >
            {item.adoptionStatus === "available" ? "Available" : "Adopted"}
          </div>
        )}
      </div>

    
      <div className="p-3 sm:p-4 md:p-5 flex flex-col gap-2 flex-1">
        <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-800 line-clamp-1">
          {item.name}
        </h3>

        <p className="text-xs sm:text-sm md:text-base text-gray-600 line-clamp-1">
          {item.breed && `Breed: ${item.breed}`}{" "}
          {item.age && `• Age: ${item.age} yrs`}
        </p>

        <div className="flex flex-col md:flex-row justify-between items-center text-gray-700 text-xs sm:text-sm md:text-base">
          <div className="flex items-center gap-1 sm:gap-2">
            <DollarSign size={12} sm={14} className="text-primary" />
            <span>
              {item.isPet
                ? item.price && item.price > 0
                  ? `$${item.price}`
                  : "Free"
                : item.price && item.price > 0
                ? `$${item.price}`
                : "N/A"}
            </span>
          </div>
          {item.location && (
            <div className="flex items-center gap-1 sm:gap-2 max-w-[100px] truncate">
              <MapPin size={12} sm={14} className="text-primary" />
              <span className="line-clamp-1">{item.location}</span>
            </div>
          )}
        </div>

        <button
          onClick={() => navigate(`/listing/${item._id}`)}
          className="mt-3 bg-primary text-white font-semibold px-3 sm:px-4 py-1.5 sm:py-2 md:py-2.5 rounded-lg hover:bg-accent transition-colors text-xs sm:text-sm md:text-base"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
