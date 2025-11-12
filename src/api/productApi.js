import api from "../axios/axiosConfig"



export const getProducts = async ({
  search = "",
  category = "",
  page = 1,
  limit = 10,
  sort = "",
  featured = "",
}) => {
  const response = await api.get("/products",{
      params: { search, category, page, limit, sort, featured },
    });
  return response.data;
};
export const storeProduct = async (productData) => {
    const response = await api.post('/products', productData)
    return response?.data

}