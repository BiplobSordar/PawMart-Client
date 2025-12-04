import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import api from "../axios/axiosConfig";
import toast from "react-hot-toast";
import { handleError } from "../utils/handleError";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dashboardOpen, setDashboardOpen] = useState(false);

  const { user, loading, logout } = useAuth();

  const navLinksBeforeLogin = [
    { name: "Home", to: "/" },
    { name: "Pets & Supplies", to: "/pets-supplies" },
    {name:'Contact',to:'/contact'},
    {name:'About',to:'/about'},
    {name:'Support',to:'/support'},
  ];

  const navLinksAfterLogin = [
    { name: "Home", to: "/" },
    { name: "Pets & Supplies", to: "/pets-supplies" },
  ];

  const dashboardLinks = [
    { name: "Add Listing", to: "/add-listing" },
    { name: "My Listings", to: "/my-listings" },
    { name: "My Orders", to: "/my-orders" },
  ];

  const handleLogout = async () => {
    try {
      await api.post("/users/logout");
      logout();
      toast.success("User Logged Out Successfully");
    } catch (error) {
      toast.error(handleError(error));
    }
  };

  return (
    <nav className="bg-[#FF8C42] shadow-lg fixed w-full z-50">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to={"/"}>
            <div className="flex items-center cursor-pointer space-x-2">
              <img
                src="/pet.ico"
                alt="Logo"
                className="h-10 w-10 rounded-full border-2 border-white"
              />
              <span className="text-[#2D2D34] text-2xl font-bold">
                PawMart
              </span>
            </div>
          </Link>

          
          <div className="hidden md:flex items-center space-x-6">
            {(user ? navLinksAfterLogin : navLinksBeforeLogin).map((link) => (
              <Link
                key={link.name}
                to={link.to}
                className="text-[#2D2D34] font-semibold hover:text-[#ffffff] transition-all"
              >
                {link.name}
              </Link>
            ))}

           
            {user && (
              <div className="relative md:block lg:hidden">
                <button
                  onClick={() => setDashboardOpen(!dashboardOpen)}
                  className="flex items-center space-x-1 text-[#2D2D34] font-semibold hover:text-[#FFE066]"
                >
                  <span>Dashboard</span>
                  <ChevronDown size={18} />
                </button>

                {dashboardOpen && (
                  <div className="absolute mt-2 bg-[#F8F9FA] rounded-lg shadow-lg py-2 w-44 z-50">
                    {dashboardLinks.map((link) => (
                      <Link
                        key={link.name}
                        to={link.to}
                        onClick={() => setDashboardOpen(false)}
                        className="block px-4 py-2 text-[#2D2D34] hover:bg-[#FFE066] hover:text-[#ffffff] rounded-md transition"
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}

     
            <div className="hidden lg:flex space-x-6">
              {user &&
                dashboardLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.to}
                    className="text-[#2D2D34] font-semibold hover:text-[#ffffff] transition"
                  >
                    {link.name}
                  </Link>
                ))}
            </div>
          </div>

  
          <div className="hidden md:flex items-center space-x-4 relative">
            {!user && !loading ? (
              <>
                <Link
                  to="/signin"
                  className="text-[#2D2D34] font-semibold hover:text-[#ffffff]"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-[#F8F9FA] text-[#FF8C42] font-bold px-4 py-1 rounded-full shadow hover:bg-[#FFE066] hover:text-[#ffffff] transition"
                >
                  Register
                </Link>
              </>
            ) : loading ? (
              <div className="h-9 w-9 rounded-full bg-gray-300 animate-pulse"></div>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-2 px-2 py-1 bg-[#FFE066] rounded-full hover:bg-[#F8F9FA] transition"
                >
                  <img
                    src={user.avatar || "/user.avif"}
                    alt="Profile"
                    className="h-9 w-9 rounded-full border-2 border-white"
                  />
                  <ChevronDown className="text-[#2D2D34]" size={18} />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-[#F8F9FA] rounded-xl shadow-lg py-2 z-50">
                    <button
                      className="w-full text-left px-4 py-2 text-[#2D2D34] hover:bg-[#FFE066] hover:text-[#ffffff] rounded-lg transition"
                      onClick={() => {
                        handleLogout();
                        setDropdownOpen(false);
                      }}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

        
          <button onClick={() => setIsOpen(true)} className="md:hidden text-[#2D2D34]">
            <Menu size={28} />
          </button>
        </div>
      </div>

    
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

   
     <div
  className={`fixed top-0 right-0 h-screen w-64 bg-[#FF8C42] shadow-xl transform transition-transform duration-300 z-50
    ${isOpen ? "translate-x-0" : "translate-x-full"}`}
>

  <div className="flex justify-end p-4">
    <button
      onClick={() => setIsOpen(false)}
      className="text-[#2D2D34] hover:text-[#FFE066] transition"
    >
      <X size={28} />
    </button>
  </div>

 
  <div className="flex flex-col items-start mt-8 space-y-4 px-6">
    {(user ? [...navLinksAfterLogin, ...dashboardLinks] : navLinksBeforeLogin).map(
      (link) => (
        <Link
          key={link.name}
          to={link.to}
          className="w-full text-[#2D2D34] font-semibold text-lg px-4 py-3 rounded-xl hover:bg-[#FFE066] hover:text-[#FF8C42] transition flex justify-center"
          onClick={() => setIsOpen(false)}
        >
          {link.name}
        </Link>
      )
    )}
  </div>

 
  <div className="absolute bottom-10 left-6 right-6 flex flex-col gap-4">
    {!user && !loading ? (
      <>
        <Link
          to="/signin"
          className="w-full bg-white text-[#FF8C42] font-bold px-4 py-3 rounded-xl shadow hover:bg-[#FFE066] hover:text-[#FF8C42] transition text-center"
          onClick={() => setIsOpen(false)}
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="w-full bg-[#2D2D34] text-white font-bold px-4 py-3 rounded-xl shadow hover:bg-[#FFE066] hover:text-[#2D2D34] transition text-center"
          onClick={() => setIsOpen(false)}
        >
          Register
        </Link>
      </>
    ) : (
      <button
        className="w-full bg-white text-[#FF8C42] font-bold px-4 py-3 rounded-xl shadow hover:bg-[#FFE066] hover:text-[#FF8C42] transition"
        onClick={() => {
          handleLogout();
          setIsOpen(false);
        }}
      >
        Logout
      </button>
    )}
  </div>
</div>

    </nav>
  );
};

export default Navbar;
