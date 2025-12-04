import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#FF8C42] w-full text-[#2D2D34] shadow-inner">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12">

     
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-8">

    
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img
                src="/pet.ico"
                alt="Logo"
                className="h-10 w-10 rounded-full border-2 border-white"
              />
              <span className="text-white text-2xl font-bold">
                PawMart
              </span>
            </div>
            <p className="text-[#2D2D34]/90">
              PawMart connects local pet owners, buyers, and enthusiasts, offering pet adoption, pet care products, and services all in one convenient platform.
            </p>
          </div>

     
          <div className="space-y-4">
            <h3 className="text-white text-xl font-bold">Useful Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-[#2D2D34] px-2 py-1 rounded-lg hover:text-white transition"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-[#2D2D34] px-2 py-1 rounded-lg hover:text-white transition"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-[#2D2D34] px-2 py-1 rounded-lg hover:text-white transition"
                >
                  About
                </Link>
              </li>
               <li>
                <Link
                  to="/support"
                  className="text-[#2D2D34] px-2 py-1 rounded-lg hover:text-white transition"
                >
                  Support
                </Link>
              </li>
              
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-white text-xl font-bold">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-[#2D2D34] p-2 rounded-lg hover:text-white hover:bg-[#FFE066] transition"
              >
                <Facebook size={24} />
              </a>
              <a
                href="#"
                className="text-[#2D2D34] p-2 rounded-lg hover:text-white hover:bg-[#FFE066] transition"
              >
                <Instagram size={24} />
              </a>
              <a
                href="#"
                className="text-[#2D2D34] p-2 rounded-lg hover:text-white hover:bg-[#FFE066] transition"
              >
                <Twitter size={24} />
              </a>
              <a
                href="#"
                className="text-[#2D2D34] p-2 rounded-lg hover:text-white hover:bg-[#FFE066] transition"
              >
                <Youtube size={24} />
              </a>
            </div>
          </div>

        </div>

       
        <div className="border-t border-[#FFE066]/50 pt-4 flex flex-col md:flex-row justify-between text-[#2D2D34]/80 text-sm">
          <span>&copy; {new Date().getFullYear()} PawMart. All rights reserved.</span>
          <span>
            Developed by <span className="font-semibold text-white">Biplob Sordar</span>
          </span>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
