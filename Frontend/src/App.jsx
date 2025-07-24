import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FormBuilder from "./components/FormBuilder";
import FormSummary from "./components/FormSummary";
import Navbar from "./components/Navbar";
import './App.css'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<FormBuilder />} />
          <Route path="/summary" element={<FormSummary />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
