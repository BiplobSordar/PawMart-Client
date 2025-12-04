import React, { createContext, useContext, useState, useEffect } from "react";
import { getProducts } from "../api/productApi";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [sections, setSections] = useState({
    featured: { data: [], loading: false, error: "" },
    latest: { data: [], loading: false, error: "" },
    products: { data: [], loading: false, error: "", page: 1, total: 0 },
    recommended: { data: [], loading: false, error: "" },
    pet: { data: [], loading: false, error: "" },
   
  });

  const [filters, setFilters] = useState({
    search: "",
    category: "",
    sort: "",
    page: 1,
    limit: 10,
    isPet: undefined,
  });


  const loadSection = async (sectionName, params = {}) => {
    setSections((prev) => ({
      ...prev,
      [sectionName]: { ...prev[sectionName], loading: true, error: "" },
    }));

    try {
      const queryParams = { ...filters, ...params };
      const data = await getProducts(queryParams);

      setSections((prev) => ({
        ...prev,
        [sectionName]: {
          ...prev[sectionName],
          data: data.products,
          total: data.total || 0,
          loading: false,
          error: "",
        },
      }));
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Failed to fetch products";
      setSections((prev) => ({
        ...prev,
        [sectionName]: { ...prev[sectionName], loading: false, error: errorMessage },
      }));
    }
  };

 
  const loadRecommended = async (productId, limit = 5) => {
    setSections((prev) => ({
      ...prev,
      recommended: { ...prev.recommended, loading: true, error: "" },
    }));

    try {
      const data = await getProducts({ recommendedFor: productId, limit });
      setSections((prev) => ({
        ...prev,
        recommended: { ...prev.recommended, data: data.products, loading: false, error: "" },
      }));
    } catch (err) {
      setSections((prev) => ({
        ...prev,
        recommended: { ...prev.recommended, loading: false, error: err.message },
      }));
    }
  };

  
  const loadProducts = (customFilters = {}) => {
    loadSection("products", customFilters);
  };


  const resetSections = () =>
    setSections({
      featured: { data: [], loading: false, error: "" },
      latest: { data: [], loading: false, error: "" },
      products: { data: [], loading: false, error: "", page: 1, total: 0 },
      recommended: { data: [], loading: false, error: "" },
    });

  useEffect(() => {
    loadSection("latest", { sort: "latest", limit: 5 });
    loadSection("featured", { fetured: true, limit: 5 });
    loadSection("products", { sort: "latest", limit: 5 });
    loadSection("pet", { isPet: true, limit: 5 });
  }, []);

  useEffect(() => {
  const products = sections.products.data;
  if (products.length > 0) {
   
    const randomIndex = Math.floor(Math.random() * products.length);
    const randomProductId = products[randomIndex]._id;

  
    loadRecommended(randomProductId);
  }
}, [sections.products.data]); 


 
  console.log(sections)

  return (
    <ProductContext.Provider
      value={{
        sections,
        filters,
        setFilters,
        loadProducts,
        loadSection,
        resetSections,
        loadRecommended,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);

