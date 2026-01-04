import { useState, useEffect } from "react";
import { 
  Search, 
  Filter, 
  User, 
  Mail, 
  Phone, 
  ShoppingBag, 
  DollarSign,
  Calendar,
  MessageSquare,
  Eye,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Star
} from "lucide-react";
import api from "../axios/axiosConfig";
import { toast } from "react-toastify";

const CustomersPage = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customerOrders, setCustomerOrders] = useState([]);
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    minOrders: '',
    minSpent: ''
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  });

  useEffect(() => {
    fetchCustomers();
  }, [pagination.page, filters.minOrders, filters.minSpent]);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const params = {
        page: pagination.page,
        limit: pagination.limit
      };
      
      const response = await api.get('/seller/customers', { params });
      if (response.data.success) {
        setCustomers(response.data.data);
        setPagination(response.data.pagination);
      }
    } catch (error) {
      console.error('Error fetching customers:', error);
      toast.error('Failed to load customers');
    } finally {
      setLoading(false);
    }
  };

  const fetchCustomerOrders = async (customerId) => {
    try {
      const response = await api.get(`/seller/customers/${customerId}/orders`);
      if (response.data.success) {
        setCustomerOrders(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching customer orders:', error);
      toast.error('Failed to load customer orders');
    }
  };

  const viewCustomerDetails = async (customer) => {
    setSelectedCustomer(customer);
    await fetchCustomerOrders(customer._id);
    setShowCustomerModal(true);
  };

  const getCustomerTier = (totalSpent) => {
    if (totalSpent > 1000) return { label: 'VIP', color: 'bg-purple-100 text-purple-800' };
    if (totalSpent > 500) return { label: 'Regular', color: 'bg-blue-100 text-blue-800' };
    return { label: 'New', color: 'bg-gray-100 text-gray-800' };
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.pages) {
      setPagination(prev => ({ ...prev, page: newPage }));
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleSendMessage = (customer) => {
    toast.info(`Message feature coming soon for ${customer.name}`);
  };

  return (
    <div className="space-y-6">
    
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-[#2D2D34]">Customers</h2>
          <p className="text-gray-600">Manage and communicate with your customers</p>
        </div>
        <div className="text-sm text-gray-500">
          Total Customers: <span className="font-bold text-[#FF8C42]">{pagination.total}</span>
        </div>
      </div>

 
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search customers..."
              value={filters.search}
              onChange={(e) => setFilters({...filters, search: e.target.value})}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8C42]"
            />
          </div>
          
          <div className="relative">
            <input
              type="number"
              placeholder="Min. Orders"
              value={filters.minOrders}
              onChange={(e) => setFilters({...filters, minOrders: e.target.value})}
              className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-lg"
              min="0"
            />
          </div>
          
          <div className="relative">
            <input
              type="number"
              placeholder="Min. Spent ($)"
              value={filters.minSpent}
              onChange={(e) => setFilters({...filters, minSpent: e.target.value})}
              className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-lg"
              min="0"
              step="0.01"
            />
          </div>
          
          <button
            onClick={fetchCustomers}
            className="bg-[#FF8C42] text-white px-4 py-2 rounded-lg hover:bg-[#FFE066] flex items-center justify-center"
          >
            <Filter size={18} className="mr-2" />
            Apply Filters
          </button>
        </div>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Revenue</p>
              <p className="text-2xl font-bold text-[#2D2D34]">
                ${customers.reduce((sum, c) => sum + c.totalSpent, 0).toFixed(2)}
              </p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <TrendingUp className="text-green-600" size={24} />
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-500">
            From {customers.length} customers
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Average Order Value</p>
              <p className="text-2xl font-bold text-[#2D2D34]">
                ${customers.length > 0 ? (customers.reduce((sum, c) => sum + c.totalSpent, 0) / customers.reduce((sum, c) => sum + c.totalOrders, 0)).toFixed(2) : '0.00'}
              </p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <ShoppingBag className="text-blue-600" size={24} />
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-500">
            Per customer
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Repeat Customers</p>
              <p className="text-2xl font-bold text-[#2D2D34]">
                {customers.filter(c => c.totalOrders > 1).length}
              </p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <Star className="text-purple-600" size={24} />
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-500">
            {customers.length > 0 ? `${Math.round((customers.filter(c => c.totalOrders > 1).length / customers.length) * 100)}% retention` : '0% retention'}
          </div>
        </div>
      </div>


      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#FF8C42] mx-auto"></div>
            <p className="mt-2 text-gray-500">Loading customers...</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Orders</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Spent</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer Tier</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Order</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {customers.map((customer) => {
                    const tier = getCustomerTier(customer.totalSpent);
                    return (
                      <tr key={customer._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF8C42] to-[#FFE066] flex items-center justify-center text-white font-bold mr-3">
                              {customer.name?.charAt(0)}
                            </div>
                            <div>
                              <p className="font-bold text-[#2D2D34]">{customer.name}</p>
                              <p className="text-xs text-gray-500">Customer since {formatDate(customer.firstOrder)}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="space-y-1">
                            <div className="flex items-center text-sm">
                              <Mail size={14} className="text-gray-400 mr-2" />
                              {customer.email}
                            </div>
                            {customer.phone && (
                              <div className="flex items-center text-sm">
                                <Phone size={14} className="text-gray-400 mr-2" />
                                {customer.phone}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <ShoppingBag size={18} className="text-gray-400 mr-2" />
                            <span className="font-bold">{customer.totalOrders}</span>
                            <span className="text-sm text-gray-500 ml-1">orders</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <DollarSign size={18} className="text-green-500 mr-2" />
                            <span className="font-bold text-[#2D2D34]">${customer.totalSpent.toFixed(2)}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${tier.color}`}>
                            {tier.label}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm">{formatDate(customer.lastOrder)}</div>
                          <div className="text-xs text-gray-500">Last purchase</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => viewCustomerDetails(customer)}
                              className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg"
                              title="View Details"
                            >
                              <Eye size={18} />
                            </button>
                            <button
                              onClick={() => handleSendMessage(customer)}
                              className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg"
                              title="Send Message"
                            >
                              <MessageSquare size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            
   
            {customers.length > 0 && (
              <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  Showing <span className="font-medium">{(pagination.page - 1) * pagination.limit + 1}</span> to{' '}
                  <span className="font-medium">
                    {Math.min(pagination.page * pagination.limit, pagination.total)}
                  </span>{' '}
                  of <span className="font-medium">{pagination.total}</span> customers
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={pagination.page === 1}
                    className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: Math.min(5, pagination.pages) }, (_, i) => {
                      let pageNum;
                      if (pagination.pages <= 5) {
                        pageNum = i + 1;
                      } else if (pagination.page <= 3) {
                        pageNum = i + 1;
                      } else if (pagination.page >= pagination.pages - 2) {
                        pageNum = pagination.pages - 4 + i;
                      } else {
                        pageNum = pagination.page - 2 + i;
                      }
                      
                      return (
                        <button
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          className={`px-3 py-1 rounded-lg ${
                            pagination.page === pageNum
                              ? 'bg-[#FF8C42] text-white'
                              : 'border border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>
                  
                  <button
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={pagination.page === pagination.pages}
                    className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>


      {showCustomerModal && selectedCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-xl font-bold text-[#2D2D34]">Customer Details</h3>
                  <p className="text-sm text-gray-500">{selectedCustomer.name}</p>
                </div>
                <button
                  onClick={() => {
                    setShowCustomerModal(false);
                    setSelectedCustomer(null);
                    setCustomerOrders([]);
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-6">
      
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="col-span-1">
                    <div className="bg-gradient-to-br from-[#FF8C42] to-[#FFE066] rounded-xl p-6 text-center text-white">
                      <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                        <User size={32} />
                      </div>
                      <h4 className="text-xl font-bold">{selectedCustomer.name}</h4>
                      <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium mt-2 ${getCustomerTier(selectedCustomer.totalSpent).color}`}>
                        {getCustomerTier(selectedCustomer.totalSpent).label} Customer
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-span-2">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm text-gray-500">Total Orders</p>
                        <p className="text-2xl font-bold text-[#2D2D34]">{selectedCustomer.totalOrders}</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm text-gray-500">Total Spent</p>
                        <p className="text-2xl font-bold text-[#FF8C42]">${selectedCustomer.totalSpent.toFixed(2)}</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm text-gray-500">First Order</p>
                        <p className="font-medium">{formatDate(selectedCustomer.firstOrder)}</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm text-gray-500">Last Order</p>
                        <p className="font-medium">{formatDate(selectedCustomer.lastOrder)}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
    
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-bold text-[#2D2D34] mb-3">Contact Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <Mail size={18} className="text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium">{selectedCustomer.email}</p>
                      </div>
                    </div>
                    {selectedCustomer.phone && (
                      <div className="flex items-center">
                        <Phone size={18} className="text-gray-400 mr-3" />
                        <div>
                          <p className="text-sm text-gray-500">Phone</p>
                          <p className="font-medium">{selectedCustomer.phone}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
    
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-bold text-[#2D2D34] mb-3">Recent Orders</h4>
                  {customerOrders.length > 0 ? (
                    <div className="space-y-3">
                      {customerOrders.slice(0, 5).map((order) => (
                        <div key={order._id} className="flex items-center justify-between p-3 bg-white rounded-lg">
                          <div>
                            <p className="font-medium">Order #{order._id.slice(-8)}</p>
                            <p className="text-sm text-gray-500">{formatDate(order.createdAt)}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-[#FF8C42]">${order.price * order.quantity}</p>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              order.status === 'completed' ? 'bg-green-100 text-green-800' :
                              order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {order.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-4">No orders found</p>
                  )}
                </div>
                
      
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => handleSendMessage(selectedCustomer)}
                    className="flex items-center px-4 py-2 bg-[#FF8C42] text-white rounded-lg hover:bg-[#FFE066]"
                  >
                    <MessageSquare size={18} className="mr-2" />
                    Send Message
                  </button>
                  <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Phone size={18} className="mr-2" />
                    Call Customer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomersPage;