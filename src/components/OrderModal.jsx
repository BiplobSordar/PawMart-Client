import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { createOrder } from "../api/orderApi"


const OrderModal = ({ product, isOpen, onClose }) => {
  console.log(product,'this is the product') 
  const [formData, setFormData] = useState({
    productId: product?._id || "",
    quantity: product?.isPet ? 1 : 1,
    price: product?.isPet ? 0 : product?.price || 0,
    address: "",
    date: "",
    phone:  "",
    notes: "",
    isPet: !!product?.isPet,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createOrder(formData);
      toast.success("Order placed successfully!");
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Failed to place order. Try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl w-full max-w-md p-6 md:p-8 shadow-lg relative">
        <h2 className="text-2xl font-bold mb-6">Place Your Order</h2>
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          ✕
        </button>

        <form className="space-y-4" onSubmit={handleSubmit}>
        
          <div>
            <label className="font-medium">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg"
            />
          </div>

  
          <div>
            <label className="font-medium">Pick-up Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg"
            />
          </div>

  
          <div>
            <label className="font-medium">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg"
            />
          </div>

        
          <div>
            <label className="font-medium">Additional Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={3}
              className="w-full p-3 border rounded-lg"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-accent transition duration-300"
          >
            {loading ? "Placing Order..." : product?.isPet?'Adopt':'Order Now'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrderModal;
