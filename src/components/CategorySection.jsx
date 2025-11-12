import React from "react";
import { Link } from "react-router-dom";
import { useCategory } from "../context/CategoryContext";
import CategorySkeleton from "./skeletons/CategorySkeleton";

const CategorySection = ({ title = "Explore Categories" }) => {

  const { categories, loading }=useCategory()

   if (loading) return <CategorySkeleton />;
   console.log(categories,'thsi is the')
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
          <Link
            key={cat.name}
            to={'/'}
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
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
