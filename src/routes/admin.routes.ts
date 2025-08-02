import { Router } from 'express';
import { deleteUserById, getUsers, deleteOrderById } from '../controllers/admin.controller';

const router = Router();

router.get('/api/users', getUsers);
router.post('/api/users/:id', deleteUserById);
router.post('/api/orders/:id', deleteOrderById);

export default router;