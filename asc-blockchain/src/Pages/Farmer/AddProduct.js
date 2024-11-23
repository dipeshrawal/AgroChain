import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Farmer/FarmerNavbar';

const FarmerDashboard = () => {
  const [productName, setProductName] = useState('');
  const [pricePerKg, setPricePerKg] = useState('');
  const [quantity, setQuantity] = useState('');
  const [qrcode, setQrCode] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      name: productName,
      pricePerKg: parseFloat(pricePerKg),
      quantity: parseInt(quantity),
      status: 'pending',
    };

    try {
      const response = await axios.post('http://localhost:5000/api/products/addproduct', productData);
      alert('Product added successfully');
      console.log(response.data);

      // Set the QR code from the response
      setQrCode(response.data.product.qrCode);
    } catch (error) {
      console.error('Error adding product:', error);
      alert('There was an error adding the product');
    }
  };

  return (
    <div className=" bg-[#eaf0e1] ">
      <Navbar/>
    
      <div className="w-full max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg mt-6">
        <h2 className="text-3xl font-semibold text-center text-gray-700 mb-4">Farmer Dashboard</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-600" htmlFor="productName">
              Product Name
            </label>
            <input
              id="productName"
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter product name"
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-600" htmlFor="pricePerKg">
              Price per kg
            </label>
            <input
              id="pricePerKg"
              type="number"
              value={pricePerKg}
              onChange={(e) => setPricePerKg(e.target.value)}
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter price per kg"
            />
          </div>

          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-600" htmlFor="quantity">
              Quantity(kg)
            </label>
            <input
              id="quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter quantity"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default FarmerDashboard;
