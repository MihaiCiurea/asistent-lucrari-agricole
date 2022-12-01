import React from "react";
import "./App.scss";
import Home from "./pages/home";
import Header from "./components/header/header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Operations from "./pages/operations";
import About from "./pages/about";
import Categorii from "./pages/categorii";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/operations/:operation" element={<Operations />} />
          <Route path="/categorii" element={<Categorii />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
