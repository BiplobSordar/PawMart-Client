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

  const {user,loading,logout}=useAuth()

  const navLinksBeforeLogin = [
    { name: "Home", to: "/" },
    { name: "Pets & Supplies", to: "/pets" },
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



  const handleLogout =async()=>{
    try {
      await api.post('/users/logout')
       logout() 
      toast.success('User Logged Out Successfully')
    } catch (error) {
      console.log(error)
      toast.error(handleError(error))
      
    }
  }
  return (
    <nav className="bg-gradient-to-r from-[#FF8C42] via-[#FFE066] to-[#FFB6B9] shadow-lg fixed w-full z-50">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
         
          <Link to={"/"}>
            <div className="flex items-center cursor-pointer space-x-2">
              <img
                src="/pet.ico"
                alt="Logo"
                className="h-10 w-10 rounded-full border-2 border-white"
              />
              <span className="text-[#3A3A3A] text-2xl font-bold drop-shadow-lg">
                PawMart
              </span>
            </div>
          </Link>

        
          <div className="hidden md:flex items-center space-x-6">
            {(user ? navLinksAfterLogin : navLinksBeforeLogin).map((link) => (
              <Link
                key={link.name}
                to={link.to}
                className="text-[#3A3A3A] font-semibold hover:text-white transition-all"
              >
                {link.name}
              </Link>
            ))}

       
            {user && (
              <div className="relative md:block lg:hidden">
                <button
                  onClick={() => setDashboardOpen(!dashboardOpen)}
                  className="flex items-center space-x-1 text-[#3A3A3A] font-semibold hover:text-white transition"
                >
                  <span>Dashboard</span>
                  <ChevronDown size={18} />
                </button>

                {dashboardOpen && (
                  <div className="absolute mt-2 bg-white rounded-lg shadow-lg py-2 w-44 z-50">
                    {dashboardLinks.map((link) => (
                      <Link
                        key={link.name}
                        to={link.to}
                        onClick={() => setDashboardOpen(false)}
                        className="block px-4 py-2 text-[#3A3A3A] hover:bg-[#FF8C42] hover:text-white rounded-md transition"
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
                    className="text-[#3A3A3A] font-semibold hover:text-white transition"
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
                  className="text-[#3A3A3A] font-semibold hover:text-white transition"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-white text-[#FF8C42] font-bold px-4 py-1 rounded-full shadow-lg hover:bg-[#FF8C42] hover:text-white transition-all"
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
                  className="flex items-center space-x-2 px-2 py-1 bg-white/20 rounded-full hover:bg-white/30 transition"
                >
                  <img
                    src={user.avatar || "/user.avif"}
                    alt="Profile"
                    className="h-9 w-9 rounded-full border-2 border-white"
                  />
                  <ChevronDown className="text-[#3A3A3A]" size={18} />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg py-2 z-50">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-[#3A3A3A] hover:bg-[#FF8C42] hover:text-white rounded-lg transition"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      className="w-full text-left px-4 py-2 text-[#3A3A3A] hover:bg-[#FF8C42] hover:text-white rounded-lg transition"
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

          
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(true)} className="text-[#3A3A3A]">
              <Menu size={28} />
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <div
        className={`fixed top-0 right-0 h-screen w-64 bg-gradient-to-b from-[#FF8C42] via-[#FFE066] to-[#FFB6B9] shadow-xl transform transition-transform duration-300 z-50
          ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex justify-end p-4">
          <button onClick={() => setIsOpen(false)}>
            <X className="text-[#3A3A3A]" size={28} />
          </button>
        </div>

        <div className="flex flex-col items-start mt-10 space-y-6 px-6">
          {(user ? [...navLinksAfterLogin, ...dashboardLinks] : navLinksBeforeLogin).map((link) => (
            <Link
              key={link.name}
              to={link.to}
              className="text-[#3A3A3A] font-semibold text-lg hover:text-white transition"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="absolute bottom-10 left-6 right-6 flex flex-col space-y-4">
          {!user && !loading ? (
            <>
              <Link
                to="/login"
                className="text-[#3A3A3A] font-semibold text-lg hover:text-white transition"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-white text-[#FF8C42] font-bold px-4 py-2 rounded-full shadow-lg hover:bg-[#FF8C42] hover:text-white transition-all text-center"
                onClick={() => setIsOpen(false)}
              >
                Register
              </Link>
            </>
          ) : loading ? (
            <div className="h-12 w-12 rounded-full bg-gray-300 animate-pulse"></div>
          ) : (
            <>
              <Link
                to="/profile"
                className="text-[#3A3A3A] font-semibold text-lg my-2 hover:text-white transition"
                onClick={() => setIsOpen(false)}
              >
                Profile
              </Link>
              <button
                className="text-[#3A3A3A] font-semibold text-lg hover:text-white transition text-left"
                onClick={() => {
                 handleLogout()
                  setIsOpen(false);
                }}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
