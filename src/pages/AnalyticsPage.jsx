import { useState, useEffect } from "react";
import { 
  TrendingUp, 
  DollarSign, 
  ShoppingBag, 
  Users, 
  Package,
  Calendar,
  Download,
  RefreshCw,
  Filter,
  BarChart3,
  PieChart,
  LineChart
} from "lucide-react";
import {
  LineChart as RechartsLineChart,
  Line,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import api from "../axios/axiosConfig";
import { toast } from "react-toastify";

const AnalyticsPage = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('month');
  const [chartType, setChartType] = useState('sales');
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: ''
  });

  useEffect(() => {
    fetchAnalytics();
  }, [period]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const params = { period };
      
      const response = await api.get('/seller/analytics', { params });
      if (response.data.success) {
        setAnalytics(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
      toast.error('Failed to load analytics data');
    } finally {
      setLoading(false);
    }
  };

  const handleExportData = () => {
    toast.info('Export feature coming soon');
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(value);
  };

  const formatSalesData = (salesData) => {
    if (!salesData) return [];
    
    return salesData.map(item => ({
      name: period === 'day' ? `${item._id.hour}:00` : `Day ${item._id.day}`,
      sales: item.totalSales,
      orders: item.orderCount
    }));
  };

  const topProductsData = analytics?.topProducts?.map(product => ({
    name: product.product.name.length > 15 ? product.product.name.substring(0, 15) + '...' : product.product.name,
    value: product.totalRevenue,
    quantity: product.totalSold
  })) || [];

  const orderStatsData = analytics?.orderStats?.map(stat => ({
    name: stat._id.charAt(0).toUpperCase() + stat._id.slice(1),
    value: stat.count,
    color: stat._id === 'completed' ? '#10B981' : 
           stat._id === 'pending' ? '#F59E0B' : 
           '#EF4444'
  })) || [];

  const COLORS = ['#FF8C42', '#FFE066', '#34D399', '#60A5FA', '#F472B6'];

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-64 mt-2 animate-pulse"></div>
          </div>
          <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-sm animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-8 bg-gray-200 rounded w-2/3 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-full"></div>
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[1, 2].map(i => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-sm animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-1/3 mb-6"></div>
              <div className="h-64 bg-gray-200 rounded"></div>
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
          <h2 className="text-2xl font-bold text-[#2D2D34]">Analytics Dashboard</h2>
          <p className="text-gray-600">Track your store performance and insights</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2"
          >
            <option value="day">Last 24 Hours</option>
            <option value="week">Last 7 Days</option>
            <option value="month">Last 30 Days</option>
            <option value="year">Last Year</option>
          </select>
          <button
            onClick={handleExportData}
            className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Download size={18} className="mr-2" />
            Export
          </button>
        </div>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Revenue</p>
              <p className="text-2xl font-bold text-[#2D2D34]">
                {formatCurrency(
                  analytics?.salesOverTime?.reduce((sum, item) => sum + item.totalSales, 0) || 0
                )}
              </p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <TrendingUp className="text-green-600" size={24} />
            </div>
          </div>
          <div className="mt-4 text-sm text-green-600">
            +12.5% from last period
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Orders</p>
              <p className="text-2xl font-bold text-[#2D2D34]">
                {analytics?.salesOverTime?.reduce((sum, item) => sum + item.orderCount, 0) || 0}
              </p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <ShoppingBag className="text-blue-600" size={24} />
            </div>
          </div>
          <div className="mt-4 text-sm text-blue-600">
            +8.2% from last period
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Average Order Value</p>
              <p className="text-2xl font-bold text-[#2D2D34]">
                {formatCurrency(
                  analytics?.salesOverTime?.reduce((sum, item) => sum + item.totalSales, 0) / 
                  (analytics?.salesOverTime?.reduce((sum, item) => sum + item.orderCount, 0) || 1)
                )}
              </p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <DollarSign className="text-purple-600" size={24} />
            </div>
          </div>
          <div className="mt-4 text-sm text-purple-600">
            +4.3% from last period
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Conversion Rate</p>
              <p className="text-2xl font-bold text-[#2D2D34]">3.2%</p>
            </div>
            <div className="p-3 bg-pink-50 rounded-lg">
              <Users className="text-pink-600" size={24} />
            </div>
          </div>
          <div className="mt-4 text-sm text-pink-600">
            +0.8% from last period
          </div>
        </div>
      </div>

 
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
     
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-[#2D2D34]">Sales Overview</h3>
              <p className="text-sm text-gray-500">Revenue and orders over time</p>
            </div>
            <div className="flex items-center space-x-2">
              <LineChart className="text-[#FF8C42]" size={24} />
              <select
                value={chartType}
                onChange={(e) => setChartType(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-1 text-sm"
              >
                <option value="sales">Revenue</option>
                <option value="orders">Orders</option>
              </select>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsLineChart data={formatSalesData(analytics?.salesOverTime)}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip 
                  formatter={(value) => [chartType === 'sales' ? formatCurrency(value) : value, chartType === 'sales' ? 'Revenue' : 'Orders']}
                  labelFormatter={(label) => `Period: ${label}`}
                />
                <Legend />
                {chartType === 'sales' ? (
                  <Line
                    type="monotone"
                    dataKey="sales"
                    stroke="#FF8C42"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                    name="Revenue"
                  />
                ) : (
                  <Line
                    type="monotone"
                    dataKey="orders"
                    stroke="#60A5FA"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                    name="Orders"
                  />
                )}
              </RechartsLineChart>
            </ResponsiveContainer>
          </div>
        </div>


        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-[#2D2D34]">Top Products</h3>
              <p className="text-sm text-gray-500">Best performing products</p>
            </div>
            <BarChart3 className="text-[#FF8C42]" size={24} />
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topProductsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip 
                  formatter={(value) => [formatCurrency(value), 'Revenue']}
                  labelFormatter={(label) => `Product: ${label}`}
                />
                <Legend />
                <Bar dataKey="value" fill="#FF8C42" name="Revenue" radius={[4, 4, 0, 0]} />
                <Bar dataKey="quantity" fill="#FFE066" name="Quantity Sold" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-[#2D2D34]">Order Status</h3>
              <p className="text-sm text-gray-500">Distribution of order statuses</p>
            </div>
            <PieChart className="text-[#FF8C42]" size={24} />
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={orderStatsData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {orderStatsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [value, 'Orders']} />
                <Legend />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
        </div>


        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-[#2D2D34]">Performance Metrics</h3>
              <p className="text-sm text-gray-500">Key performance indicators</p>
            </div>
            <TrendingUp className="text-[#FF8C42]" size={24} />
          </div>
          <div className="space-y-4">
            {[
              { label: 'Customer Satisfaction', value: '4.8/5', change: '+0.2', color: 'text-green-600' },
              { label: 'Order Processing Time', value: '2.4 hours', change: '-0.5', color: 'text-blue-600' },
              { label: 'Return Rate', value: '2.1%', change: '-0.3%', color: 'text-green-600' },
              { label: 'Repeat Purchase Rate', value: '35%', change: '+4%', color: 'text-green-600' },
              { label: 'Inventory Turnover', value: '4.2x', change: '+0.5', color: 'text-purple-600' }
            ].map((metric, index) => (
              <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-[#2D2D34]">{metric.label}</p>
                  <p className="text-sm text-gray-500">Current period</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold">{metric.value}</p>
                  <p className={`text-sm ${metric.color}`}>{metric.change}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>


      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-bold text-[#2D2D34] mb-4">Data Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Time Period</p>
                <p className="font-medium capitalize">{period}</p>
              </div>
              <Calendar className="text-gray-400" size={20} />
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Data Points</p>
                <p className="font-medium">{analytics?.salesOverTime?.length || 0}</p>
              </div>
              <Package className="text-gray-400" size={20} />
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Last Updated</p>
                <p className="font-medium">{new Date().toLocaleDateString()}</p>
              </div>
              <RefreshCw className="text-gray-400" size={20} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;