import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const RetailerData = () => {
  const [retailers, setRetailers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchRetailers() {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/stakeholder/retailer"
        );
        setRetailers(response.data);
      } catch (error) {
        console.error("Error fetching retailer data:", error);
      }
    }
    fetchRetailers();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from local storage
    alert("Logged out successfully");
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="min-h-screen  bg-[#e8f0e1] px-0 pb-6 pt-0">
        {/* Navbar */}
      <nav className="bg-blue-600 shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-white text-2xl font-semibold">
          AgroChain
          </h1>
          <ul className="flex space-x-6">
            <li>
              <Link
                to="/userDashboard"
                className="text-white text-lg hover:text-blue-300 transition"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/retailerdata"
                className="text-white text-lg hover:text-blue-300 transition"
              >
                Retailer Data
              </Link>
            </li>
            <li>
              <Link
                to="/farmerdata"
                className="text-white text-lg hover:text-blue-300 transition"
              >
                Farmer Data
              </Link>
            </li>
            <li>
              <Link
                to="/distributordata"
                className="text-white text-lg hover:text-blue-300 transition"
              >
                Rate of Product
              </Link>
            </li>
          </ul>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </nav>
      <p className="text-4xl font-bold text-center text-[#2a7f4c] mb-6 mt-6">
        Retailer Data
      </p>
      <div className="bg-gradient-to-r from-green-100 via-white to-blue-100 p-8 rounded-xl shadow-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-200">
            <thead>
            <tr className="bg-[#4c9a2a] text-white">
                <th className="py-4 px-6 text-left font-medium">Name</th>
                <th className="py-4 px-6 text-left font-medium">Email</th>
                <th className="py-4 px-6 text-left font-medium">Contact</th>
                <th className="py-4 px-6 text-left font-medium">Address</th>
              </tr>
            </thead>
            <tbody>
              {retailers.length > 0 ? (
                retailers.map((retailer) => (
                  <tr
                    key={retailer._id}
                    className="border-b border-gray-200 hover:bg-green-100"
                  >
                    <td className="py-4 px-6">{retailer.fullname}</td>
                    <td className="py-4 px-6">{retailer.email}</td>
                    <td className="py-4 px-6">{retailer.contact}</td>
                    <td className="py-4 px-6">{retailer.address}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="py-4 px-6 text-center text-gray-500"
                  >
                    No retailer data available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RetailerData;
