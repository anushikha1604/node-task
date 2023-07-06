import Product from '../models/product.js';
import User from '../models/user.js';

export const addToCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user.userId; // Extracted from the token in the middleware

    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Check if the product quantity is available
    if (product.quantity === 0) {
      return res.status(400).json({ error: 'Product out of stock' });
    }

    // Update product quantity
    product.quantity--;
    await product.save();

    // Add product to the user's cart
    const user = await User.findById(userId);
    console.log("user...", user);
    user.cart.push(product._id);
    console.log("user.cart...", user);
    await user.save();

    res.status(200).json({ message: 'Product added to cart successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user.userId; // Extracted from the token in the middleware

    // Remove product from the user's cart
    const user = await User.findById(userId);
    const index = user.cart.indexOf(productId);
    if (index !==-1) {
      user.cart.splice(index, 1);
      await user.save();
    }

    res.status(200).json({ message: 'Product removed from cart successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const addMultipleToCart = async (req, res) => {
    try {
      const { productIds } = req.body;
      const userId = req.user.userId;
  
      // Retrieve the user
      const user = await User.findById(userId);
  
      // Loop through the product IDs and add them to the cart
      for (const productId of productIds) {
        // Check if the product exists
        const product = await Product.findById(productId);
        if (!product) {
          return res.status(404).json({ error: `Product with ID ${productId} not found` });
        }
  
        // Check if the product quantity is available
        if (product.quantity === 0) {
          return res.status(400).json({ error: `Product with ID ${productId} is out of stock` });
        }
  
        // Update product quantity
        product.quantity--;
        await product.save();
  
        // Add product to the user's cart
        user.cart.push(product._id);
      }
  
      // Save the user with the updated cart
      await user.save();
  
      res.status(200).json({ message: 'Products added to cart successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };  

export const clearCart = async (req, res) => {
  try {
    const userId = req.user.userId; // Extracted from the token in the middleware

    // Clear user's cart
    const user = await User.findById(userId);
    user.cart = [];
    await user.save();

    res.status(200).json({ message: 'Cart cleared successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getCartData = async (req, res) => {
  try {
    const userId = req.user.userId; // Extracted from the token in the middleware

    // Retrieve user's cart data
    const user = await User.findById(userId).populate('cart');
    const products = user.cart;
    let totalPrice = 0;

    // Calculate total price
    for (const product of products) {
      totalPrice += product.price;
    }

    res.status(200).json({ products, totalPrice });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
