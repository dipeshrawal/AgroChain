import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import Navbar from './DistributorNavbar';

const DistributorProductInfo = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const result = await axios.get('http://localhost:5000/api/products/productlist');
        setProducts(result.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }
    fetchProducts();
  }, []);

  const handleApproval = async (id, action) => {
    try {
      // Update the product status to either approved or rejected
      await axios.put(`http://localhost:5000/api/products/${id}`, { status: action });
      alert('Product status updated');
      // Refetch products after update to refresh the list
      const result = await axios.get('http://localhost:5000/api/products/productlist');
      setProducts(result.data);
    } catch (error) {
      console.error('Error updating status:', error);
      alert('There was an error updating the status');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from local storage
    alert("Logged out successfully");
    navigate("/login"); // Redirect to login page
  };

  return (
    <div div className="min-h-screen  bg-[#e8f0e1] px-0 pb-6 pt-0">
        <Navbar/>
      <p className="text-4xl font-bold text-center text-[#4c9a2a] mb-6 mt-6">
        Product information
      </p>
      <table className="min-w-full bg-[#eaf0e1] border border-gray-300">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">Product Name</th>
            <th className="px-4 py-2 text-left">Price per Kg</th>
            <th className="px-4 py-2 text-left">Quantity</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id} className="hover:bg-gray-100">
              <td className="px-4 py-2">{product.name}</td>
              <td className="px-4 py-2">{product.pricePerKg}</td>
              <td className="px-4 py-2">{product.quantity}</td>
              <td className="px-4 py-2">{product.status}</td>
              <td className="px-4 py-2">
                {product.status === 'pending' && (
                  <>
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                      onClick={() => handleApproval(product._id, 'approved')}
                    >
                      Approve
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded"
                      onClick={() => handleApproval(product._id, 'rejected')}
                    >
                      Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DistributorProductInfo;
