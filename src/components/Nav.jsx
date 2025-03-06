// src/components/Nav.js
import React from "react";
import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <header className="bg-customPurple p-4 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-4 sm:space-y-0">
          <div className="mb-4 sm:mb-0">
            {/* Logo */}
            <Link to="/">
              <img src="/images/logo.png" alt="Curly Logo" className="h-14" />
            </Link>
          </div>
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
            {/* Search Bar */}
            <div className="bg-white rounded-md px-3 py-2 flex items-center w-full sm:w-64">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder=""
                className="ml-2 w-full outline-none text-sm"
              />
            </div>
            {/* Icons and Login/Signup Buttons */}
            <div className="flex items-center space-x-2">
              {/* Cart Icon */}
              <div className="bg-white rounded-md p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              {/* Heart Icon */}
              <div className="bg-white rounded-md p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              {/* Login Button */}
              <Link
                to="/login"
                className="bg-white text-black py-2 px-4 rounded-md font-medium text-sm hover:bg-gray-100"
              >
                Login
              </Link>
              {/* Signup Button */}
              <Link
                to="/signup"
                className="bg-white text-black py-2 px-4 rounded-md font-medium text-sm hover:bg-gray-100"
              >
                Signup
              </Link>
            </div>
          </div>
        </div>

        {/* Navigation Links - Centered and Black */}
        <nav className="flex flex-wrap justify-center text-black font-medium space-x-2 sm:space-x-4">
          <Link to="/" className="px-2 sm:px-4 py-2 hover:underline">
            Home
          </Link>
          <Link to="/our-boxes" className="px-2 sm:px-4 py-2 hover:underline">
            Our boxes
          </Link>
          <Link to="/promotions" className="px-2 sm:px-4 py-2 hover:underline">
            Promotions
          </Link>
          <Link to="/categories" className="px-2 sm:px-4 py-2 hover:underline">
            Our Categories
          </Link>
          <Link to="/blog" className="px-2 sm:px-4 py-2 hover:underline">
            Blog
          </Link>
        </nav>
      </div>
    </header>
  );
}