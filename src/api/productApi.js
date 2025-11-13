import api from "../axios/axiosConfig"



export const getProducts = async ({
  search = "",
  category = "",
  page = 1,
  limit = 10,
  sort = "",
  featured = "",
}) => {
  const response = await api.get("/products", {
    params: { search, category, page, limit, sort, featured },
  });
  return response.data;
};



export const storeProduct = async (productData) => {
  const response = await api.post('/products', productData)
  return response?.data

}


export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}`)

  return response?.data

}


export const getMyListings = async () => {
  const response = await api.get(`/products/my-listing`)

  return response?.data

}
export const deleteProduct = async (id) => {
  const response = await api.delete(`/products/${id}`);
  return response.data;
};


export const updateProduct = async (id, productData) => {
  const response = await api.put(`/products/${id}`, productData);
  return response.data;
};

