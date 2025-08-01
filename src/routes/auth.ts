import { Router } from 'express';
import { roleAdmin } from '../middlewares/role';
import adminRouter from './admin';
import { getProducts } from '../controllers/auth';

const router = Router();

router.get('/api/products', getProducts);
router.use(roleAdmin, adminRouter);

export default router;