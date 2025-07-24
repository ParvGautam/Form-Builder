import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-700 text-white px-6 py-4 flex items-center justify-between shadow">
      <div className="text-xl font-bold">Form Builder App</div>
      <div className="space-x-4">
        <Link to="/" className="hover:underline">Form Builder</Link>
        <Link to="/summary" className="hover:underline">Form Summary</Link>
      </div>
    </nav>
  );
};

export default Navbar; 