import api from "../axios/axiosConfig";

export const createOrder = async (orderData) => {
  const res = await api.post("/orders", orderData);
  return res.data;
};


export const getMyOrders = async () => {
  const response = await api.get("/orders/for-me");
  return response.data;
};