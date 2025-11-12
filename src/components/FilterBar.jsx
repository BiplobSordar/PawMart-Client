import React, { useState, useEffect } from "react";
import { useCategory } from "../context/CategoryContext";
import { useProducts } from "../context/ProductContext";

const FilterBar = () => {
  const { categories, loading: categoriesLoading } = useCategory();
  const { filters, setFilters } = useProducts();

  const { search, category, sort } = filters;


  const [searchInput, setSearchInput] = useState(search || "");


  useEffect(() => {
    const timeout = setTimeout(() => {
      setFilters((prev) => ({ ...prev, search: searchInput, page: 1 }));
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchInput, setFilters]);

  return (
    <div className="w-full bg-white shadow-md rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">

      <input
        type="text"
        placeholder="🔍 Search pets or products..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        className="flex-1 w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary outline-none transition"
      />


      <select
        value={category}
        onChange={(e) =>
          setFilters((prev) => ({ ...prev, category: e.target.value, page: 1 }))
        }
        disabled={categoriesLoading}
        className="p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary outline-none transition"
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat._id} value={cat._id}>
            {cat.name}
          </option>
        ))}
      </select>


      <select
        value={sort}
        onChange={(e) =>
          setFilters((prev) => ({ ...prev, sort: e.target.value, page: 1 }))
        }
        className="p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary outline-none transition"
      >
        <option value="">Sort by</option>
        <option value="priceLow">Price: Low → High</option>
        <option value="priceHigh">Price: High → Low</option>
        <option value="latest">Newest First</option>
        <option value="oldest">Oldest First</option>
      </select>
    </div>
  );
};

export default FilterBar;
