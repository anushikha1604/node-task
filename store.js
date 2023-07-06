import express from 'express';
import * as storeController from '../controllers/storeController.js';

const router = express.Router();

router.post('/product', storeController.addProduct);
router.put('/product/:id', storeController.updateProduct);
router.delete('/product/:id', storeController.deleteProduct);
router.get('/products', storeController.getProducts);

export default router;
