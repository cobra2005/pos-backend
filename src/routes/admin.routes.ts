import { Router } from 'express';
import { deleteUserById, getUsers, deleteOrderById } from '../controllers/admin.controller';
import stockRouter from './stock.routes'

const router = Router();

router.get('/api/users', getUsers);
router.post('/api/users/:id', deleteUserById);
router.post('/api/orders/:id', deleteOrderById);
router.use('/api/stock', stockRouter)

export default router;