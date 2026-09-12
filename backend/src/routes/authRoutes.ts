import { Router } from 'express';
import { register, login, getMe, uploadAvatar } from '../controllers/authController';
import { authenticateToken } from '../middleware/auth';
import { upload } from '../config/cloudinary';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', authenticateToken, getMe);
router.post('/avatar', authenticateToken, upload.single('avatar'), uploadAvatar);

export default router;
