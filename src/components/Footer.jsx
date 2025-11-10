import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#FF8C42] via-[#FFE066] to-[#FFB6B9] w-full text-text shadow-inner ">
      <div className="max-w-[1600px]  mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-8">

          {/* Logo & Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img
                src="/pet.ico"
                alt="Logo"
                className="h-10 w-10 rounded-full border-2 border-white"
              />
              <span className="text-white text-2xl font-bold drop-shadow-lg">
                PawMart
              </span>
            </div>
            <p className="text-text/80">
              PawMart connects local pet owners and buyers for adoption and pet care products.
            </p>
          </div>

          {/* Useful Links */}
          <div className="space-y-4">
            <h3 className="text-white text-xl font-bold">Useful Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-text hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-text hover:text-white transition">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-text hover:text-white transition">
                  Terms
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-white text-xl font-bold">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-text hover:text-white transition">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-text hover:text-white transition">
                <Instagram size={24} />
              </a>
              <a href="#" className="text-text hover:text-white transition">
                <Twitter size={24} />
              </a>
              <a href="#" className="text-text hover:text-white transition">
                <Youtube size={24} />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Section: Copyright & Credit */}
        <div className="border-t border-white/30 pt-4 flex flex-col md:flex-row justify-between text-text/70 text-sm">
          <span>&copy; {new Date().getFullYear()} PawMart. All rights reserved.</span>
          <span>Developed by <span className="font-semibold">Your Name</span></span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
