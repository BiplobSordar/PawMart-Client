import api from "../axios/axiosConfig"

export const storeProduct = async (productData) => {
    const response = await api.post('/products', productData)
    return response?.data

}