import React from "react";
import ProductCard from "../components/ProductCard";
import ProductCardSkeleton from "./skeletons/ProductCardSkeleton";

const ProductsForSelling = ({ listings = [], loading }) => {
console.log(listings,'thsi is form product for selleing')
  return (
    <section className="max-w-[1600px] mx-auto px-4 md:px-8 my-20">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10 text-primary">
        Products for Sale
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-xxl-cols-5 gap-4 sm:gap-6 md:gap-8 justify-items-center">
        {loading
          ? Array.from({ length: 5 }).map((_, i) => <ProductCardSkeleton key={i} />)
          : listings
              .map((item) => <ProductCard key={item._id} item={item} />)}
      </div>
    </section>
  );
};

export default ProductsForSelling;
