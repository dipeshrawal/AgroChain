import React, { useState } from "react";
import "../Styles/FarmerProductForm.css";

const FarmerProductForm = () => {
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ product, quantity, price });
    alert("Product details submitted!");
    setProduct("");
    setQuantity("");
    setPrice("");
  };

  return (
    <div className="farmer-product-form">
      <h1>Add Product Details</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Product Name</label>
          <input
            type="text"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Quantity (in kg)</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Price (per kg)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default FarmerProductForm;
