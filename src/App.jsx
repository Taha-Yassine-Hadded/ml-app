import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import RecommendationModel from "./pages/RecommendationModel";
import StressLevelPrediction from "./pages/StressLevelPrediction";
import BurnoutPrediction from "./pages/BurnoutPrediction";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/recommendation" element={<RecommendationModel />} />
          <Route path="/stress-prediction" element={<StressLevelPrediction />} />
          <Route path="/burnout-prediction" element={<BurnoutPrediction />} />
        </Route>
      </Routes>
    </Router>
  );
}