import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);

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

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Your Products</h2>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-3 px-4 font-medium text-gray-700">Product Name</th>
              <th className="py-3 px-4 font-medium text-gray-700">Price per Kg</th>
              <th className="py-3 px-4 font-medium text-gray-700">Quantity</th>
              <th className="py-3 px-4 font-medium text-gray-700">Status</th>
              <th className="py-3 px-4 font-medium text-gray-700">QR Code</th> {/* New column */}
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4 text-gray-700">{product.name}</td>
                <td className="py-3 px-4 text-gray-700">{product.pricePerKg}</td>
                <td className="py-3 px-4 text-gray-700">{product.quantity}</td>
                <td className="py-3 px-4 text-gray-700">
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      product.status === 'pending'
                        ? 'bg-yellow-200 text-yellow-800'
                        : product.status === 'approved'
                        ? 'bg-green-200 text-green-800'
                        : 'bg-red-200 text-red-800'
                    }`}
                  >
                    {product.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-gray-700">
                  {product.qrCode ? (
                    <img src={product.qrCode} alt={`${product.name} QR Code`} className="w-16 h-16" />
                  ) : (
                    <span>No QR Code</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
