import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="flex-grow bg-white flex items-center justify-center">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-center">Welcome to Curly Haire Care</h1>
        <p className="text-center text-gray-600 mt-4">
          Discover the best hair care products for your curls!
        </p>
        <div className="text-center mt-4">
          <Link to="/checkout" className="text-blue-500 hover:underline">
            Go to Checkout
          </Link>
        </div>
      </div>
    </main>
  );
}