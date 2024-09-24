import { Router } from 'express'
import { logout, signIn, signUp, getMe } from '../controllers/users.controller.js';
import { authMiddlewares } from '../middlewares/authMiddlewares.js';

const router = Router();
router.post('/register', signUp);
router.post('/login', signIn);
router.post('/logout', logout);
router.get('/getme', authMiddlewares,getMe)
export default router;