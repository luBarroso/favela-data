import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "maplibre-gl/dist/maplibre-gl.css";
import { Home } from "./pages/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
