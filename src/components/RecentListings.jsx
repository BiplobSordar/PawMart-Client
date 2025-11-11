import React from "react";
import ProductCard from "../components/ProductCard";

const RecentListings = ({ listings = [] }) => {
  return (
    <section className="max-w-[1600px] mx-auto px-4 md:px-8 my-20">
      
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10 text-primary">
        Recent Listings
      </h2>

      
      <div
        className="
          grid
          grid-cols-2 sm:grid-cols-2 lg:grid-cols-3
          gap-6 md:gap-8
          place-items-center
        "
      >
        {listings.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
};

export default RecentListings;
