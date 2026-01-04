import { useState, useEffect } from "react";
import {
  User,
  Mail,
  MapPin,
  Phone,
  Calendar,
  Edit2,
  Shield,
  Store,
  UserCheck,
  PawPrint,
  CheckCircle,
  Loader2,
} from "lucide-react";
import api from "../axios/axiosConfig";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateForm, setUpdateForm] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    avatar: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const response = await api.get('/users/me');
        if (response.data?.data) {
          setUser(response.data.data);
          setUpdateForm({
            name: response.data.data.name,
            email: response.data.data.email,
            address: response.data.data.address,
            phone: response.data.data.phone,
            avatar: response.data.data.avatar,
          });
          toast.success("Profile loaded successfully!");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Failed to load profile data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleRoleToggle = async () => {
    if (!user) return;

    try {
      const response = await api.put('/users/me/role', { 
        role: user.role === 'user' ? 'seller' : 'user' 
      });
      
      if (response.data?.success) {
        setUser(response.data.data);
        toast.success(`Role changed to ${response.data.data.role}!`);
      }
    } catch (error) {
      console.error("Error updating role:", error);
      toast.error("Failed to update role");
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      const response = await api.put('/users/me', updateForm);
      if (response.data?.success) {
        setUser(response.data.data);
        setShowUpdateModal(false);
        toast.success("Profile updated successfully!");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateForm(prev => ({ ...prev, [name]: value }));
  };

  const calculateProfileCompletion = () => {
    if (!user) return 0;

    const fields = [
      user.name,
      user.email,
      user.address,
      user.avatar,
      user.phone,
      user.role,
    ];

    const completed = fields.filter(field => field && field.trim() !== "").length;
    return Math.round((completed / fields.length) * 100);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div className="h-10 w-32 bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="h-10 w-40 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <div className="flex flex-col md:flex-row items-center md:items-start">
              <div className="w-32 h-32 rounded-full bg-gray-200 animate-pulse mb-4 md:mb-0 md:mr-6"></div>
              <div className="flex-1 w-full">
                <div className="h-8 bg-gray-200 rounded-lg animate-pulse mb-4 w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse mb-2 w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse mb-4 w-2/3"></div>
                <div className="h-10 bg-gray-200 rounded-lg animate-pulse w-40"></div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl shadow-sm p-6">
                <div className="h-6 bg-gray-200 rounded animate-pulse mb-4 w-1/3"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }


  if(user){
 return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      
      <div className="min-h-screen bg-[#F8F9FA] p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <header className="flex justify-between items-center my-8">
            <h1 className="text-2xl md:text-3xl font-bold text-[#FF8C42]">Hello ,</h1>
            <div className="flex items-center space-x-4">
              <span className="hidden md:inline text-gray-600">Welcome back!</span>
              <button
                onClick={() => setShowUpdateModal(true)}
                className="bg-[#FF8C42] text-white rounded-full px-6 py-2 hover:bg-[#FFE066] transition-colors duration-300 flex items-center"
              >
                <Edit2 size={18} className="mr-2" />
                Edit Profile
              </button>
            </div>
          </header>

          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <div className="flex flex-col md:flex-row items-center md:items-start">
              <div className="relative mb-4 md:mb-0 md:mr-6">
                <img
                  src={user.avatar ||'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200&q=80'}
                  alt={user.name}
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                />
                <div className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-md">
                  <PawPrint className="text-[#FF8C42]" size={20} />
                </div>
              </div>

              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-[#2D2D34] mb-1">
                      {user.name}
                    </h2>
                    <p className="text-gray-600 mb-2 flex items-center justify-center md:justify-start">
                      <Mail size={16} className="mr-1" />
                      {user.email}
                    </p>
                    <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${user.role === "user"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-green-100 text-green-800"
                          }`}
                      >
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                      <span className="text-sm text-gray-500 flex items-center">
                        <Calendar size={14} className="mr-1" />
                        Member since {formatDate(user.createdAt)}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 md:mt-0">
                    <button
                      onClick={handleRoleToggle}
                      className="bg-[#FF8C42] text-white rounded-full px-6 py-2 hover:bg-[#FFE066] transition-colors duration-300 flex items-center"
                    >
                      {user.role === "user" ? (
                        <>
                          <Store size={18} className="mr-2" />
                          Become a Seller
                        </>
                      ) : (
                        <>
                          <User size={18} className="mr-2" />
                          Switch to User
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <p className="text-gray-700 mb-4">
                  Animal lover and passionate about pet adoption. Currently looking for a new
                  furry friend to join the family.
                </p>

                <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm">
                  <div className="flex items-center text-gray-600">
                    <MapPin size={16} className="mr-2 text-[#FF8C42]" />
                    <span>{user.address}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone size={16} className="mr-2 text-[#FF8C42]" />
                    <span>{user.phone}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <UserCheck size={16} className="mr-2 text-[#FF8C42]" />
                    <span>ID: {user.uid}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-xl font-bold text-[#2D2D34] mb-4 flex items-center">
                <User className="mr-2 text-[#FF8C42]" size={22} />
                Contact Information
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Email Address</p>
                  <p className="font-medium">{user.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone Number</p>
                  <p className="font-medium">{user.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Shipping Address</p>
                  <p className="font-medium">{user.address}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-xl font-bold text-[#2D2D34] mb-4 flex items-center">
                <Shield className="mr-2 text-[#FF8C42]" size={22} />
                Account Status
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Current Role</p>
                  <div className="flex items-center mt-1">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-medium mr-2 ${user.role === "user"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-green-100 text-green-800"
                        }`}
                    >
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                    <span className="text-sm">
                      {user.role === "user"
                        ? "Can browse and adopt pets"
                        : "Can list pets for sale and manage store"}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Account Created</p>
                  <p className="font-medium">{formatDate(user.createdAt)}</p>
                </div>
                <div className="pt-2">
                  <p className="text-sm text-gray-500 mb-2">
                    Switch your role to access seller features
                  </p>
                  <button
                    onClick={handleRoleToggle}
                    className="w-full border-2 border-[#FF8C42] text-[#FF8C42] rounded-full px-4 py-2 hover:bg-[#FF8C42] hover:text-white transition-colors duration-300 flex items-center justify-center"
                  >
                    <Store size={18} className="mr-2" />
                    {user.role === "user" ? "Become a Seller" : "Switch to User"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="text-xl font-bold text-[#2D2D34] mb-4">Additional Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold mb-2 text-[#FF8C42]">User ID</h4>
                <p className="text-sm font-mono p-2 bg-gray-50 rounded">{user.uid}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Unique identifier for your account
                </p>
              </div>
              <div>
                <h4 className="font-bold mb-2 text-[#FF8C42]">Profile Completion</h4>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                  <div
                    className="h-2.5 rounded-full bg-[#FF8C42]"
                    style={{ width: `${calculateProfileCompletion()}%` }}
                  ></div>
                </div>
                <p className="text-sm font-medium">{calculateProfileCompletion()}% Complete</p>
                <p className="text-xs text-gray-500 mt-1">
                  Complete your profile for better experience
                </p>
              </div>
            </div>
          </div>
        </div>

        {showUpdateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-[#2D2D34]">Update Profile</h3>
                  <button
                    onClick={() => setShowUpdateModal(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleUpdateSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={updateForm.name}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8C42] focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={updateForm.email}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8C42] focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={updateForm.phone}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8C42] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <textarea
                      name="address"
                      value={updateForm.address}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8C42] focus:border-transparent"
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Avatar URL
                    </label>
                    <input
                      type="url"
                      name="avatar"
                      value={updateForm.avatar}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8C42] focus:border-transparent"
                      placeholder="https://example.com/avatar.jpg"
                    />
                  </div>

                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowUpdateModal(false)}
                      className="border-2 border-[#FF8C42] text-[#FF8C42] rounded-full px-6 py-2 hover:bg-[#FF8C42] hover:text-white transition-colors duration-300"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isUpdating}
                      className="bg-[#FF8C42] text-white rounded-full px-6 py-2 hover:bg-[#FFE066] transition-colors duration-300 flex items-center disabled:opacity-70"
                    >
                      {isUpdating ? (
                        <>
                          <Loader2 size={18} className="mr-2 animate-spin" />
                          Updating...
                        </>
                      ) : (
                        <>
                          <CheckCircle size={18} className="mr-2" />
                          Save Changes
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
  }
 
};

export default ProfilePage;