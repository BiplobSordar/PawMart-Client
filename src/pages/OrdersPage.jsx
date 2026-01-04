import { useState, useEffect } from "react";
import { 
  Search, 
  Filter, 
  Calendar, 
  Eye, 
  CheckCircle, 
  XCircle, 
  Truck,
  RefreshCw,
  Download,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  Phone,
  MapPin,
  Package,
  Clock,
  DollarSign,
  User
} from "lucide-react";
import api from "../axios/axiosConfig";
import { toast } from "react-toastify";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const [filters, setFilters] = useState({
    status: '',
    startDate: '',
    endDate: '',
    search: ''
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  });

  useEffect(() => {
    fetchOrders();
  }, [pagination.page, filters.status, filters.startDate, filters.endDate]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const params = {
        page: pagination.page,
        limit: pagination.limit,
        status: filters.status,
        startDate: filters.startDate,
        endDate: filters.endDate
      };
      
      const response = await api.get('/seller/orders', { params });
      if (response.data.success) {
        setOrders(response.data.data);
        setPagination(response.data.pagination);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async () => {
    console.log(selectedOrder,'thsi si inside update orderstatsus')
    try {
      const response = await api.put(`/seller/orders/${selectedOrder._id}/status`, {
        status: newStatus
      });
      
      if (response.data.success) {
        toast.success(`Order status updated to ${newStatus}`);
        setShowStatusModal(false);
        setSelectedOrder(null);
        setNewStatus('');
        fetchOrders();
      }
    } catch (error) {
      console.error('Error updating order:', error);
      toast.error(error.response?.data?.message || 'Failed to update order status');
    }
  };

  const handleStatusChange = (order, status) => {
    setSelectedOrder(order);
    setNewStatus(status);
    setShowStatusModal(true);
  };

  const viewOrderDetails = (order) => {
    setSelectedOrder(order);
    setShowOrderModal(true);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: <Clock size={14} /> },
      completed: { bg: 'bg-green-100', text: 'text-green-800', icon: <CheckCircle size={14} /> },
      cancelled: { bg: 'bg-red-100', text: 'text-red-800', icon: <XCircle size={14} /> },
      shipped: { bg: 'bg-blue-100', text: 'text-blue-800', icon: <Truck size={14} /> }
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center ${config.bg} ${config.text}`}>
        {config.icon}
        <span className="ml-1 capitalize">{status}</span>
      </span>
    );
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.pages) {
      setPagination(prev => ({ ...prev, page: newPage }));
    }
  };

  const handleExportOrders = () => {
    toast.info('Export feature coming soon');
  };

  const handleFilterReset = () => {
    setFilters({
      status: '',
      startDate: '',
      endDate: '',
      search: ''
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">

      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-[#2D2D34]">Orders</h2>
          <p className="text-gray-600">Manage customer orders and track fulfillment</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleExportOrders}
            className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Download size={18} className="mr-2" />
            Export
          </button>
          <button
            onClick={fetchOrders}
            className="flex items-center px-4 py-2 bg-[#FF8C42] text-white rounded-lg hover:bg-[#FFE066]"
          >
            <RefreshCw size={18} className="mr-2" />
            Refresh
          </button>
        </div>
      </div>


      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by order ID or customer..."
              value={filters.search}
              onChange={(e) => setFilters({...filters, search: e.target.value})}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8C42]"
            />
          </div>
          
          <select
            value={filters.status}
            onChange={(e) => setFilters({...filters, status: e.target.value})}
            className="border border-gray-300 rounded-lg px-4 py-2"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          
          <div className="flex items-center space-x-2">
            <input
              type="date"
              value={filters.startDate}
              onChange={(e) => setFilters({...filters, startDate: e.target.value})}
              className="border border-gray-300 rounded-lg px-3 py-2 w-full"
              placeholder="Start Date"
            />
            <span className="text-gray-400">to</span>
            <input
              type="date"
              value={filters.endDate}
              onChange={(e) => setFilters({...filters, endDate: e.target.value})}
              className="border border-gray-300 rounded-lg px-3 py-2 w-full"
              placeholder="End Date"
            />
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={fetchOrders}
              className="flex-1 bg-[#FF8C42] text-white px-4 py-2 rounded-lg hover:bg-[#FFE066] flex items-center justify-center"
            >
              <Filter size={18} className="mr-2" />
              Apply
            </button>
            <button
              onClick={handleFilterReset}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Orders</p>
              <p className="text-2xl font-bold text-[#2D2D34]">{pagination.total}</p>
            </div>
            <div className="p-2 bg-blue-50 rounded-lg">
              <Package className="text-blue-600" size={20} />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Pending</p>
              <p className="text-2xl font-bold text-[#2D2D34]">
                {orders.filter(o => o.status === 'pending').length}
              </p>
            </div>
            <div className="p-2 bg-yellow-50 rounded-lg">
              <Clock className="text-yellow-600" size={20} />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Completed</p>
              <p className="text-2xl font-bold text-[#2D2D34]">
                {orders.filter(o => o.status === 'completed').length}
              </p>
            </div>
            <div className="p-2 bg-green-50 rounded-lg">
              <CheckCircle className="text-green-600" size={20} />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Revenue</p>
              <p className="text-2xl font-bold text-[#2D2D34]">
                ${orders
                  .filter(o => o.status === 'completed')
                  .reduce((sum, order) => sum + (order.price * order.quantity), 0)
                  .toFixed(2)}
              </p>
            </div>
            <div className="p-2 bg-purple-50 rounded-lg">
              <DollarSign className="text-purple-600" size={20} />
            </div>
          </div>
        </div>
      </div>

  
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#FF8C42] mx-auto"></div>
            <p className="mt-2 text-gray-500">Loading orders...</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {orders.map((order) => (
                    <tr key={order._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="font-medium text-[#FF8C42]">#{order._id.slice(-8)}</div>
                        <div className="text-xs text-gray-500">{order.productId?.isPet ? 'Pet Adoption' : 'Product'}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                            <User size={14} />
                          </div>
                          <div>
                            <p className="font-medium">{order.buyerId?.name}</p>
                            <p className="text-xs text-gray-500">{order.buyerId?.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          {order.productId?.image ? (
                            <img src={order.productId.image} alt={order.productId.name} className="w-10 h-10 rounded-lg object-cover mr-3" />
                          ) : (
                            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center mr-3">
                              <Package size={18} className="text-gray-400" />
                            </div>
                          )}
                          <div>
                            <p className="font-medium">{order.productId?.name}</p>
                            <p className="text-xs text-gray-500">Qty: {order.quantity}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-bold text-[#2D2D34]">
                        ${(order.price * order.quantity).toFixed(2)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm">{formatDate(order.createdAt)}</div>
                        <div className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(order.status)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => viewOrderDetails(order)}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg"
                            title="View Details"
                          >
                            <Eye size={18} />
                          </button>
                          
                          {order.status === 'pending' && (
                            <>
                              <button
                                onClick={() => handleStatusChange(order, 'completed')}
                                className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg"
                                title="Mark as Completed"
                              >
                                <CheckCircle size={18} />
                              </button>
                              <button
                                onClick={() => handleStatusChange(order, 'cancelled')}
                                className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"
                                title="Cancel Order"
                              >
                                <XCircle size={18} />
                              </button>
                            </>
                          )}
                          
                          {order.status === 'completed' && (
                            <button
                              onClick={() => handleStatusChange(order, 'shipped')}
                              className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg"
                              title="Mark as Shipped"
                            >
                              <Truck size={18} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            

            {orders.length > 0 && (
              <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  Showing <span className="font-medium">{(pagination.page - 1) * pagination.limit + 1}</span> to{' '}
                  <span className="font-medium">
                    {Math.min(pagination.page * pagination.limit, pagination.total)}
                  </span>{' '}
                  of <span className="font-medium">{pagination.total}</span> orders
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

  
      {showStatusModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md">
            <div className="p-6">
              <h3 className="text-xl font-bold text-[#2D2D34] mb-4">Update Order Status</h3>
              <p className="text-gray-600 mb-6">
                Update status for order <span className="font-bold">#{selectedOrder?._id.slice(-8)}</span>
              </p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Status
                  </label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="">Select Status</option>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="shipped">Shipped</option>
                  </select>
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    onClick={() => {
                      setShowStatusModal(false);
                      setSelectedOrder(null);
                      setNewStatus('');
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={updateOrderStatus}
                    className="px-4 py-2 bg-[#FF8C42] text-white rounded-lg hover:bg-[#FFE066]"
                  >
                    Update Status
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showOrderModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-xl font-bold text-[#2D2D34]">Order Details</h3>
                  <p className="text-sm text-gray-500">#{selectedOrder._id.slice(-8)}</p>
                </div>
                <button
                  onClick={() => {
                    setShowOrderModal(false);
                    setSelectedOrder(null);
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-6">
   
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Current Status</p>
                    <div className="mt-1">{getStatusBadge(selectedOrder.status)}</div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Order Date</p>
                    <p className="font-medium">{formatDate(selectedOrder.createdAt)}</p>
                  </div>
                </div>
                

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-bold text-[#2D2D34] mb-3 flex items-center">
                    <User size={18} className="mr-2" />
                    Customer Information
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Name</p>
                      <p className="font-medium">{selectedOrder.buyerId?.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{selectedOrder.buyerId?.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium">{selectedOrder.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Shipping Address</p>
                      <p className="font-medium">{selectedOrder.address}</p>
                    </div>
                  </div>
                </div>
                
      
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-bold text-[#2D2D34] mb-3 flex items-center">
                    <Package size={18} className="mr-2" />
                    Order Items
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                      <div className="flex items-center">
                        {selectedOrder.productId?.image ? (
                          <img src={selectedOrder.productId.image} alt={selectedOrder.productId.name} className="w-16 h-16 rounded-lg object-cover mr-4" />
                        ) : (
                          <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center mr-4">
                            <Package size={24} className="text-gray-400" />
                          </div>
                        )}
                        <div>
                          <p className="font-bold text-[#2D2D34]">{selectedOrder.productId?.name}</p>
                          <p className="text-sm text-gray-500">
                            {selectedOrder.productId?.isPet ? 'Pet Adoption' : 'Product'} • Qty: {selectedOrder.quantity}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-[#FF8C42]">
                          ${(selectedOrder.price * selectedOrder.quantity).toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-500">${selectedOrder.price.toFixed(2)} each</p>
                      </div>
                    </div>
                  </div>
                </div>
                
            
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-bold text-[#2D2D34] mb-3">Order Summary</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span>${(selectedOrder.price * selectedOrder.quantity).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span>$0.00</span>
                    </div>
                    <div className="flex justify-between border-t border-gray-300 pt-2">
                      <span className="font-bold text-[#2D2D34]">Total</span>
                      <span className="font-bold text-[#FF8C42] text-lg">
                        ${(selectedOrder.price * selectedOrder.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
                
               
                <div className="flex justify-end space-x-3">
                  <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <MessageSquare size={18} className="mr-2" />
                    Message Customer
                  </button>
                  {selectedOrder.status === 'pending' && (
                    <button
                      onClick={() => {
                        setShowOrderModal(false);
                        handleStatusChange(selectedOrder, 'completed');
                      }}
                      className="flex items-center px-4 py-2 bg-[#FF8C42] text-white rounded-lg hover:bg-[#FFE066]"
                    >
                      <CheckCircle size={18} className="mr-2" />
                      Mark as Completed
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;