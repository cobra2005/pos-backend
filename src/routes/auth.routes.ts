import { Router } from 'express';
import { roleAdmin } from '../middlewares/role';
import adminRouter from './admin.routes';
import productRouter from './product.routes';
import orderRouter from './order.routes'

const router = Router();

router.use(productRouter);
router.use('/api/orders', orderRouter);
router.use(roleAdmin, adminRouter);

export default router;