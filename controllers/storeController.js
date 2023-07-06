import Product from '../models/product.js';

export const addProduct = async (req, res) => {
  try {
    const { name, image, description, price, quantity } = req.body;

    // Create a new product
    const product = new Product({
      name,
      image,
      description,
      price,
      quantity,
    });

    await product.save();

    res.status(201).json({ message: 'Product added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { name, image, description, price, quantity } = req.body;
    const productId = req.params.id;

    // Update the product
    await Product.findByIdAndUpdate(productId, {
      name,
      image,
      description,
      price,
      quantity,
    });

    res.status(200).json({ message: 'Product updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    // Delete the product
    await Product.findByIdAndDelete(productId);

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json({ products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
