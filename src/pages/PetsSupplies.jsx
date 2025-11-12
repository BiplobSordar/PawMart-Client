import React, { useEffect } from "react";
import ProductCard from "../components/ProductCard";
import FilterBar from "../components/FilterBar";
import Pagination from "../components/Pagination";
import { useProducts } from "../context/ProductContext";
import ProductCardSkeleton from "../components/skeletons/ProductCardSkeleton";

const PetsSupplies = () => {
  const { sections, filters, setFilters, loadProducts } = useProducts();

const { data = [], loading = false, error = "", total = 0 } = sections?.products || {};


  const { search, category, sort, page = 1, limit = 10 } = filters;

  useEffect(() => {
    loadProducts({ search, category, sort, page, limit });
  }, [search, category, sort, page, limit]);

  const totalPages = Math.max(1, Math.ceil(total / limit));

  return (
    <div className="min-h-screen px-4 md:px-8 py-10 bg-gray-50">
   
      <div className="max-w-[1400px] mx-auto mb-10">
        <FilterBar />
      </div>

     
      <section className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
       
        {loading &&
          Array.from({ length: limit }).map((_, i) => <ProductCardSkeleton key={i} />)}

       
        {!loading && error && (
          <p className="col-span-full text-center text-red-500 font-medium bg-red-50 p-4 rounded-xl shadow-sm">
             Failed to load products. Please try again later.
          </p>
        )}

      
        {!loading && !error && data.length === 0 && (
          <p className="col-span-full text-center text-gray-600">
            No products found.
          </p>
        )}

        {!loading && !error && data.length > 0 &&
          data.map((item) => <ProductCard key={item._id} item={item} />)}
      </section>

     
      {totalPages > 1 && (
        <Pagination
          currentPage={Number(page)}
          totalPages={totalPages}
          onPageChange={(newPage) =>
            setFilters((prev) => ({ ...prev, page: newPage }))
          }
        />
      )}
    </div>
  );
};

export default PetsSupplies;
