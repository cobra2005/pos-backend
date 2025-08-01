import { Router } from 'express';
import { registerValidate, loginValidate } from '../middlewares/validate';
import { register, login } from '../controllers';
import { authenticateToken } from '../middlewares/auth';
import authRouter from './auth';

const router = Router();

router.post('/login', loginValidate, login);
router.post('/register', registerValidate, register);
router.use('/auth', authenticateToken, authRouter)

export default router;