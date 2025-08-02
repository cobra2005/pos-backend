import { Router } from 'express';
import { createProductValidate, updateProductValidate } from '../middlewares/validate';
import { addProduct, deleteProductById, getProducts, updateProduct } from '../controllers/product.controller';
import { roleAdmin } from '../middlewares/role';

const router = Router();

router.get('/api/products', getProducts);
router.post('/api/products', roleAdmin, createProductValidate, addProduct);
router.put('/api/products/:id', roleAdmin, updateProductValidate, updateProduct);
router.delete('/api/products/:id', roleAdmin, deleteProductById);

export default router;