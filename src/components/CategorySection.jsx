import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCategory } from "../context/CategoryContext";
import CategorySkeleton from "./skeletons/CategorySkeleton";
import { useProducts } from "../context/ProductContext";

const CategorySection = ({ title = "Explore Categories" }) => {

  const { categories, loading }=useCategory()
  const {setFilters}=useProducts()
  const navigate=useNavigate()

  const handleCategoryClick=(categoryId)=>{
     setFilters((prev) => ({ ...prev, category: categoryId, page: 1 }));
     navigate('/pets-supplies')
  }

   if (loading) return <CategorySkeleton />;
  
  return (
    <section className="max-w-[1600px] mx-auto px-4 md:px-8 my-20">
    
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10 text-primary">
        {title}
      </h2>

    
      <div
        className="
          grid 
          grid-cols-2 sm:grid-cols-3 md:grid-cols-4 
          gap-6 md:gap-8 
          place-items-center
          justify-center
        "
      >
        {categories?.map((cat) => (
          <div
            key={cat.name}
           onClick={()=>{handleCategoryClick(cat?._id)}}
            className="
              flex flex-col items-center justify-center
              bg-white rounded-2xl shadow-md
              hover:shadow-xl hover:scale-105
              transition-transform duration-300
              w-[140px] h-[140px] sm:w-[160px] sm:h-[160px] md:w-[180px] md:h-[180px]
            "
          >
            <span className="text-4xl sm:text-5xl mb-2">{cat.emoji}</span>
            <span className="text-base sm:text-lg font-semibold text-gray-800 text-center">
              {cat.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
