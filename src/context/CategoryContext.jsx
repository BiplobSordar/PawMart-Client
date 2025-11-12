import { createContext, useContext, useEffect, useState } from "react";
import { getCategories } from "../api/categoryApi";
import { toast } from 'react-hot-toast'
import { handleError } from "../utils/handleError";


export const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories()

        setCategories(data?.categories
        );
      } catch (error) {
        toast.error(handleError(error))
        console.error("Failed to fetch categories:", error);

      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <CategoryContext.Provider value={{ categories, loading }}>
      {children}
    </CategoryContext.Provider>
  );
};
export const useCategory = () => useContext(CategoryContext)

