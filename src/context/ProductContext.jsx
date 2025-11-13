import React, { createContext, useContext, useState, useEffect } from "react";
import { getProducts } from "../api/productApi";


export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
 
  const [sections, setSections] = useState({
    featured: { data: [], loading: false, error: "" },
    latest: { data: [], loading: false, error: "" },
    products: { data: [], loading: false, error: "", page: 1, total: 0 },
     recommended: { data: [], loading: false, error: "" }
  });

 
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    sort: "",
    page: 1,
    limit: 10,
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
          data: data.products || data,
          total: data.total || 0,
          loading: false,
          error: "",
        },
      }));
    } catch (err) {
  
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Failed to fetch product data.";

      setSections((prev) => ({
        ...prev,
        [sectionName]: {
          ...prev[sectionName],
          loading: false,
          error: errorMessage,
        },
      }));
    }
  };


  useEffect(() => {

    loadSection("latest", { sort: "latest", limit: 3 });
  }, []);


  const loadProducts = (customFilters = {}) => {
    const merged = { ...filters, ...customFilters };
    loadSection("products", merged);
  };


  const resetSections = () =>
    setSections({
      featured: { data: [], loading: false, error: "" },
      latest: { data: [], loading: false, error: "" },
      products: { data: [], loading: false, error: "", page: 1, total: 0 },
    });



    const loadRecommended = async (categoryId) => {
  setSections((prev) => ({
    ...prev,
    recommended: { ...prev.recommended, loading: true, error: "" },
  }));

  try {
    
    const data = await getProducts({
      category: categoryId,
    
      limit: 4,
    });

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


  return (
    <ProductContext.Provider
      value={{
        sections,
        filters,
        setFilters,
        loadProducts,
        loadSection,
        resetSections,
        loadRecommended
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};


export const useProducts = () => useContext(ProductContext);
