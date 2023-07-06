import express from 'express';
import {
  addToCart,
  removeFromCart,
  clearCart,
  getCartData,
  addMultipleToCart
} from '../controllers/customerController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/cart/:productId', verifyToken, addToCart);
router.delete('/cart/:productId', verifyToken, removeFromCart);
router.delete('/cart', verifyToken, clearCart);
router.get('/cart', verifyToken, getCartData);
router.post('/cart', verifyToken, addMultipleToCart);


export default router;
