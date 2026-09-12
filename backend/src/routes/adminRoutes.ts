import { Router } from 'express';
import {
  getAdminStats,
  getStudentRoster,
  getPendingCertificates,
  approveCertificate,
  rejectCertificate,
} from '../controllers/adminController';
import { authenticateToken, requireAdmin } from '../middleware/auth';

const router = Router();

router.get('/stats', authenticateToken, requireAdmin, getAdminStats);
router.get('/students', authenticateToken, requireAdmin, getStudentRoster);
router.get('/certificates/pending', authenticateToken, requireAdmin, getPendingCertificates);
router.post('/certificates/:certId/approve', authenticateToken, requireAdmin, approveCertificate);
router.post('/certificates/:certId/reject', authenticateToken, requireAdmin, rejectCertificate);

export default router;
