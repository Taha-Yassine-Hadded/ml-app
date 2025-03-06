import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Checkout from "./pages/Checkout";
import Signup from "./pages/Signup";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/signup" element={<Signup />} />
          {/* Placeholder routes for other pages */}
          <Route path="/our-boxes" element={<div>Our Boxes Page (Coming Soon)</div>} />
          <Route path="/promotions" element={<div>Promotions Page (Coming Soon)</div>} />
          <Route path="/categories" element={<div>Categories Page (Coming Soon)</div>} />
          <Route path="/blog" element={<div>Blog Page (Coming Soon)</div>} />
        </Route>
      </Routes>
    </Router>
  );
}