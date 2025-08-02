import { Router } from 'express';
import { registerValidate, loginValidate } from '../middlewares/validate';
import { register, login } from '../controllers/index.controller';
import { authenticateToken, isGuest } from '../middlewares/auth';
import authRouter from './auth.routes';

const router = Router();

router.post('/login', isGuest, loginValidate, login);
router.post('/register', registerValidate, register);
router.use('/auth', authenticateToken, authRouter);

export default router;