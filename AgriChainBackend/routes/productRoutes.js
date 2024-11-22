const express = require('express');
const Product = require('../models/Product');
const router = express.Router();
const QRCode = require('qrcode'); // Import the QRCode package




router.post('/addproduct', async (req, res) => {
  try {
    const { name, pricePerKg, quantity, status } = req.body;

    if (!name || !pricePerKg || !quantity || !status) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // Create product data
    const productData = {
      name,
      pricePerKg,
      quantity,
      status,
    };

    // Generate QR Code
    const qrData = JSON.stringify({ name, pricePerKg });
    const qrCodeBase64 = await QRCode.toDataURL(qrData);

    // Save product with QR code
    const newProduct = new Product({ ...productData, qrCode: qrCodeBase64 });
    await newProduct.save();

    res.status(200).json({ message: 'Product added successfully', product: newProduct });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ error: 'Error adding product', details: error.message });
  }
});

module.exports = router;


// 2. Route to get all products
router.get('/productlist', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching products', details: error.message });
  }
});

// 3. Route to update the product status (approve/reject)
router.put('/:id', async (req, res) => {  // Add the :id in the route
    try {
      const { status } = req.body;
      const product = await Product.findByIdAndUpdate(req.params.id, { status }, { new: true });
  
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      res.status(200).json({ message: 'Product status updated successfully', product });
    } catch (error) {
      res.status(400).json({ error: 'Error updating product status', details: error.message });
    }
  });
  
  module.exports = router;
  
