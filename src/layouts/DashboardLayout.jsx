import { useState, useEffect, useRef } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Home,
  ShoppingBag,
  Package,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Bell,
  Search,
  ChevronDown,
  MessageSquare,
  HelpCircle,
  FileText
} from "lucide-react";
import api from "../axios/axiosConfig";
import { toast, ToastContainer } from "react-toastify";
import Navbar from "../components/Navbar"; 
import { useAuth } from "../context/AuthContext";
import { handleError } from "../utils/handleError";

const DashboardLayout = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New order received", time: "5 min ago", unread: true },
    { id: 2, message: "Product review from customer", time: "1 hour ago", unread: true },
    { id: 3, message: "Payment received", time: "2 hours ago", unread: false },
  ]);

  
  const {  logout } = useAuth
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const mainContentRef = useRef(null);

  const menuItems = [
    { icon: <Home size={20} />, label: "Dashboard", path: "/dashboard" },
    { icon: <Package size={20} />, label: "Products", path: "/dashboard/products" },
    { icon: <ShoppingBag size={20} />, label: "Orders", path: "/dashboard/orders" },
    { icon: <Users size={20} />, label: "Customers", path: "/dashboard/customers" },
    { icon: <BarChart3 size={20} />, label: "Analytics", path: "/dashboard/analytics" },
    { icon: <FileText size={20} />, label: "Reports", path: "#" },
    { icon: <MessageSquare size={20} />, label: "Messages", path: "#" },
    { icon: <Settings size={20} />, label: "Settings", path: "#" },
    { icon: <HelpCircle size={20} />, label: "Help", path: "#" },
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get('/users/me');
        if (response.data?.data) {
          setUser(response.data.data);

          if (response.data.data.role !== "seller") {
            toast.error("Access denied. Seller privileges required.");
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (mainContentRef.current) {
      mainContentRef.current.scrollTop = 0;
    }
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await api.post("/users/logout");
      logout();
      toast.success("User Logged Out Successfully");
    } catch (error) {
      toast.error(handleError(error));
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast.info(`Searching for: ${searchQuery}`);
      setSearchQuery("");
    }
  };

  const markNotificationAsRead = (id) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, unread: false } : notif
      )
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF8C42] mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user || user.role !== "seller") {
    return <Navigate to="/my-profile" />;
  }

  return (
    <>



      <div className="flex flex-col h-screen bg-[#F8F9FA]">

        <div className="fixed top-0 left-0 right-0 z-50">
          <Navbar />
        </div>


        <div className="flex flex-1 overflow-hidden pt-16">

          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}


          <aside className={`
            fixed lg:static h-[calc(100vh-4rem)] top-16 z-40
            w-64 bg-white border-r border-gray-200
            transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            lg:translate-x-0 transition-transform duration-300 ease-in-out
            flex flex-col flex-shrink-0
          `}>

            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#FF8C42] to-[#FFE066] rounded-xl flex items-center justify-center shadow-md">
                  <ShoppingBag className="text-white" size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#2D2D34]">Seller Center</h2>
                  <p className="text-xs text-[#FF8C42] font-medium">Dashboard</p>
                </div>
              </div>
            </div>


            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img
                    src={user.avatar ||'/user.avif'}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-[#FFE066]"
                  />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
                  <p className="text-xs text-gray-500 truncate capitalize">{user.role}</p>
                </div>
              </div>
            </div>


            <nav className="flex-1 p-4 overflow-y-auto">
              <div className="mb-6">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Main</h3>
                <ul className="space-y-1">
                  {menuItems.slice(0, 5).map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.path}
                        className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${location.pathname === item.path
                            ? 'bg-[#FF8C42] text-white shadow-md'
                            : 'text-gray-700 hover:bg-[#FFE066]/20 hover:text-[#FF8C42]'
                          }`}
                      >
                        <span>{item.icon}</span>
                        <span className="font-medium">{item.label}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Support</h3>
                <ul className="space-y-1">
                  {menuItems.slice(5).map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.path}
                        className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${location.pathname === item.path
                            ? 'bg-[#FF8C42] text-white shadow-md'
                            : 'text-gray-700 hover:bg-[#FFE066]/20 hover:text-[#FF8C42]'
                          }`}
                      >
                        <span>{item.icon}</span>
                        <span className="font-medium">{item.label}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>


            <div className="p-4 border-t border-gray-100">
              <div className="bg-gradient-to-r from-[#FFE066]/20 to-[#FF8C42]/10 rounded-xl p-4 mb-4">
                <h4 className="text-sm font-semibold text-[#2D2D34] mb-1">Need Help?</h4>
                <p className="text-xs text-gray-600 mb-3">Contact our support team</p>
                <button className="w-full bg-white text-[#FF8C42] border border-[#FF8C42] rounded-lg px-3 py-2 text-sm font-medium hover:bg-[#FF8C42] hover:text-white transition-colors duration-200">
                  Get Help
                </button>
              </div>

             
            </div>
          </aside>



          <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
           
            <header className="sticky top-16 z-30 bg-white border-b border-gray-200 shadow-sm px-4 sm:px-6 lg:px-8">
              <div className="h-16 flex items-center justify-between">
            
                <div className="flex items-center">
              
                  <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="lg:hidden p-2 mr-2 rounded-lg text-gray-500 hover:bg-gray-100"
                  >
                    {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
                  </button>

            
                  <div>
                    <h1 className="text-lg font-bold text-[#2D2D34]">
                      {location.pathname === '/dashboard' ? 'Dashboard' :
                        location.pathname.includes('/products') ? 'Products' :
                          location.pathname.includes('/orders') ? 'Orders' :
                            location.pathname.includes('/customers') ? 'Customers' :
                              location.pathname.includes('/analytics') ? 'Analytics' :
                                location.pathname.includes('/settings') ? 'Settings' : 'Seller Dashboard'}
                    </h1>
                    <p className="text-xs text-gray-500">
                      {location.pathname === '/dashboard' ? 'Overview of your store performance' :
                        location.pathname.includes('/products') ? 'Manage your products and inventory' :
                          location.pathname.includes('/orders') ? 'View and process customer orders' :
                            location.pathname.includes('/customers') ? 'Manage your customer relationships' :
                              location.pathname.includes('/analytics') ? 'Detailed store analytics and insights' :
                                location.pathname.includes('/settings') ? 'Store and account settings' : 'Seller Dashboard'}
                    </p>
                  </div>
                </div>

              
                <div className="flex items-center space-x-4">
           
                  <form onSubmit={handleSearch} className="hidden md:block">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search dashboard..."
                        className="pl-10 pr-4 py-2 w-64 lg:w-80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8C42] focus:border-transparent text-sm"
                      />
                    </div>
                  </form>

              
                  <div className="hidden md:flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Today's Sales</p>
                      <p className="text-sm font-semibold text-[#FF8C42]">$1,248</p>
                    </div>
                    <div className="h-6 w-px bg-gray-300"></div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">New Orders</p>
                      <p className="text-sm font-semibold text-[#FF8C42]">24</p>
                    </div>
                  </div>
                </div>
              </div>
            </header>

    
            <main
              ref={mainContentRef}
              className="flex-1 overflow-y-auto bg-[#F8F9FA] pt-16"  
            >
              <div className="p-4 md:p-6 max-w-7xl mx-auto">
                <Outlet />
              </div>

             
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;






