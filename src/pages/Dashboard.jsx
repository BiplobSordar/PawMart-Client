import { useState, useEffect } from "react";
import { 
  Package, 
  ShoppingBag, 
  DollarSign, 
  Users, 
  TrendingUp,
  AlertTriangle,
  RefreshCw,
  Calendar,
  ArrowUp,
  ArrowDown
} from "lucide-react";

import { toast } from "react-toastify";
import api from "../axios/axiosConfig";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeFilter, setTimeFilter] = useState("today");

  useEffect(() => {
    fetchDashboardData();
  }, [timeFilter]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
    
      const response = await api.get('/seller/dashboard');
      if (response.data.success) {
        setStats(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching dashboard:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    fetchDashboardData();
  };

  console.log(stats,'thsi si the data')

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-sm animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
              <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-[#2D2D34]">Dashboard Overview</h2>
          <p className="text-gray-600">Welcome to your seller dashboard</p>
        </div>
        <div className="flex items-center space-x-4">
          <select 
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm"
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
          <button
            onClick={handleRefresh}
            className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50"
          >
            <RefreshCw size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-500">Total Products</p>
              <p className="text-3xl font-bold text-[#2D2D34] mt-1">{stats?.totalProducts || 0}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <Package className="text-blue-600" size={24} />
            </div>
          </div>
          <div className="flex items-center text-green-600 text-sm">
            <ArrowUp size={16} />
            <span className="ml-1">Active</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-500">Total Orders</p>
              <p className="text-3xl font-bold text-[#2D2D34] mt-1">{stats?.totalOrders || 0}</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <ShoppingBag className="text-green-600" size={24} />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">
              {stats?.pendingOrders || 0} pending
            </span>
            <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
              {stats?.completedOrders || 0} completed
            </span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-500">Total Revenue</p>
              <p className="text-3xl font-bold text-[#2D2D34] mt-1">
                ${stats?.totalRevenue?.toFixed(2) || '0.00'}
              </p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <DollarSign className="text-purple-600" size={24} />
            </div>
          </div>
          <div className="text-green-600 text-sm flex items-center">
            <TrendingUp size={16} />
            <span className="ml-1">Lifetime earnings</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-500">Customers</p>
              <p className="text-3xl font-bold text-[#2D2D34] mt-1">
                {stats?.customers || 0}
              </p>
            </div>
            <div className="p-3 bg-pink-50 rounded-lg">
              <Users className="text-pink-600" size={24} />
            </div>
          </div>
          <div className="text-gray-500 text-sm">Unique buyers</div>
        </div>
      </div>

   
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-[#2D2D34]">Recent Orders</h3>
            <a href="/seller/orders" className="text-sm text-[#FF8C42] hover:underline">
              View all
            </a>
          </div>
          <div className="space-y-4">
            {stats?.recentOrders?.map(order => (
              <div key={order._id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-[#2D2D34]">{order.productId?.name}</p>
                  <p className="text-sm text-gray-500">{order.buyerId?.name}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-[#FF8C42]">${order.price * order.quantity}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    order.status === 'completed' ? 'bg-green-100 text-green-800' :
                    order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>


        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-[#2D2D34]">Low Stock Alert</h3>
            <a href="/seller/products" className="text-sm text-[#FF8C42] hover:underline">
              Manage
            </a>
          </div>
          <div className="space-y-4">
            {stats?.lowStockProducts?.map(product => (
              <div key={product._id} className="flex items-center justify-between p-3 hover:bg-red-50 rounded-lg border border-red-100">
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="text-red-500" size={20} />
                  <div>
                    <p className="font-medium text-[#2D2D34]">{product.name}</p>
                    <p className="text-sm text-gray-500">Stock: {product.stock}</p>
                  </div>
                </div>
                <button className="text-sm text-[#FF8C42] hover:underline">
                  Restock
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;