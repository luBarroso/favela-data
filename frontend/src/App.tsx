import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "maplibre-gl/dist/maplibre-gl.css";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/entrar" element={<Login />} />
        <Route path="/cadastro" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
