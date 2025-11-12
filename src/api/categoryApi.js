import api from "../axios/axiosConfig"


export const getCategories = async () => {
    const response = await api.get('/category')
    return response?.data
}