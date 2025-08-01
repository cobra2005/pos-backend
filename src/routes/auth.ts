import { Router } from 'express';
import { roleAdmin } from '../middlewares/role';
import { deleteUser } from '../controllers/admin';

const router = Router();

router.post('/delete/:id', roleAdmin, deleteUser)

export default router;