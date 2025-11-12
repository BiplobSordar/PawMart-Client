import React from "react";

const CategorySkeleton = () => {
    return (
        <section className="max-w-[1600px] mx-auto px-4 md:px-8 my-20 animate-pulse">
            <div className="h-8 w-48 bg-gray-200 rounded-md mx-auto mb-10" />

            <div
                className="
          grid 
          grid-cols-2 sm:grid-cols-3 md:grid-cols-4 
          gap-6 md:gap-8 
          place-items-center
          justify-center
        "
            >
                {[...Array(4)].map((_, i) => (
                    <div
                        key={i}
                        className="
              flex flex-col items-center justify-center
              bg-white rounded-2xl shadow-sm
              w-[140px] h-[140px] sm:w-[160px] sm:h-[160px] md:w-[180px] md:h-[180px]
            "
                    >

                        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gray-200 rounded-full mb-4" />

                        <div className="h-4 w-20 sm:w-24 bg-gray-200 rounded-md" />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CategorySkeleton;
