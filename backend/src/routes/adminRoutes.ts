import { Router } from 'express';
import { getAdminStats, getStudentRoster } from '../controllers/adminController';
import { authenticateToken, requireAdmin } from '../middleware/auth';

const router = Router();

router.get('/stats', authenticateToken, requireAdmin, getAdminStats);
router.get('/students', authenticateToken, requireAdmin, getStudentRoster);

export default router;
