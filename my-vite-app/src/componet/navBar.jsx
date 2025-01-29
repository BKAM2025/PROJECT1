import React from "react";
import { Search, Heart, ShoppingCart, User } from "lucide-react"; // Icons from Lucide

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between bg-white shadow-md px-6 py-4">
      {/* Left Section */}
      <div className="flex space-x-6">
        <a href="/" className="text-gray-800 hover:text-blue-500 font-medium">
          Home
        </a>
        <a href="/contact" className="text-gray-800 hover:text-blue-500 font-medium">
          Contact
        </a>
        <a href="/about" className="text-gray-800 hover:text-blue-500 font-medium">
          About
        </a>
        <a
          href="/signup"
          className="text-white bg-blue-500 hover:bg-blue-600 font-medium px-4 py-2 rounded-lg"
        >
          Sign Up
        </a>
        <Link to="/cart" className="text-gray-800 hover:text-blue-500">
          <ShoppingCart size={22} />
        </Link>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-6">
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="border border-gray-300 rounded-lg px-4 py-2 w-48 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="absolute top-1/2 right-2 transform -translate-y-1/2">
            <Search size={18} className="text-gray-600 hover:text-blue-500" />
          </button>
        </div>

        {/* Favorites */}
        <a href="/favorites" className="text-gray-800 hover:text-blue-500">
          <Heart size={22} />
        </a>

        {/* Cart */}
        <a href="/cart" className="text-gray-800 hover:text-blue-500">
          <ShoppingCart size={22} />
        </a>

        {/* Profile */}
        <a href="/profile" className="text-gray-800 hover:text-blue-500">
          <User size={22} />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
