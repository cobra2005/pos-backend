import { Router } from 'express';
import { createOrder, getOrders, getOrderById } from '../controllers/order.controller';
import { createOrderValidate } from '../middlewares/validate';

const router = Router();

router.get('/:id', getOrderById);
router.get('/', getOrders);
router.post('/', createOrderValidate, createOrder);

export default router;