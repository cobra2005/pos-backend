import { Router } from 'express';
import { 
    deleteUserById,
    getUsers,
    addProduct, 
    updateProduct,
    deleteProductById
} from '../controllers/admin';
import { createProductValidate, updateProductValidate } from '../middlewares/validate';

const router = Router();

router.get('/api/users', getUsers);
router.post('/api/products', createProductValidate, addProduct);
router.put('/api/products/:id', updateProductValidate, updateProduct);
router.post('/api/users/:id', deleteUserById);
router.delete('/api/products/:id', deleteProductById)

export default router;