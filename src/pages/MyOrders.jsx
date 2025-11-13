import React, { useEffect, useState } from "react";
import { Package, PawPrint } from "lucide-react";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { getMyOrders } from "../api/orderApi";
import { handleError } from "../utils/handleError";
import usePageTitle from '../utils/usePageTitle'
import OrdersPDF from "../components/OrdersPDF";
const MyOrders = () => {
  usePageTitle("My-Orders | PawMart");
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;
      try {
        const result = await getMyOrders();
        setOrders(result?.orders || []);
      } catch (error) {
        toast.error(handleError(error));
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user]);

  const renderSkeleton = () => (
    <div className="overflow-x-auto animate-pulse">
      
      <table className="w-full text-sm md:text-base text-left text-gray-700 border-collapse">
        <thead className="bg-gray-100 text-gray-800 font-semibold">
          <tr>
            <th className="p-4">Listing</th>
            <th className="p-4">Buyer</th>
            <th className="p-4">Price</th>
            <th className="p-4">Quantity</th>
            <th className="p-4">Address</th>
            <th className="p-4">Phone</th>
            <th className="p-4">Date</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 6 }).map((_, i) => (
            <tr key={i} className="border-b">
              {Array.from({ length: 7 }).map((__, j) => (
                <td key={j} className="p-4">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );


  console.log(orders)
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-5 md:px-16">
      <div className="max-w-[1400px] mx-auto bg-white rounded-3xl shadow-lg p-6 md:p-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">🧾 My Orders</h2>

        {loading ? (
          renderSkeleton()
        ) : orders.length === 0 ? (
          <p className="text-gray-500 text-center py-10">
            You haven’t received any orders or adoption requests yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <OrdersPDF orders={orders}/>
            <table className="w-full text-sm md:text-base text-left text-gray-700 border-collapse">
              <thead className="bg-gray-100 text-gray-800 font-semibold">
                <tr>
                  <th className="p-4">Listing</th>
                  <th className="p-4">Buyer</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Quantity</th>
                  <th className="p-4">Address</th>
                  <th className="p-4">Phone</th>
                  <th className="p-4">Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order._id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="p-4 flex items-center gap-2">
                      {order.listing?.isPet ? (
                        <PawPrint className="text-pink-500 w-4 h-4" />
                      ) : (
                        <Package className="text-blue-500 w-4 h-4" />
                      )}
                      {order.listing?.image && (
                        <img
                          src={order.listing.image}
                          alt={order.listing.name}
                          className="w-10 h-10 object-cover rounded-lg"
                        />
                      )}
                      <span className="font-medium">{order.listing?.name || "N/A"}</span>
                    </td>
                    <td className="p-4">{order.buyerName || "N/A"}</td>
                    <td className="p-4">
                      {order.listing?.isPet ? "Free" : `${order.price || 0}৳`}
                    </td>
                    <td className="p-4">{order.quantity || 1}</td>
                    <td className="p-4">{order.address || "N/A"}</td>
                    <td className="p-4">{order.phone || "N/A"}</td>
                    <td className="p-4">
                      {new Date(order.date).toLocaleDateString("en-GB")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
