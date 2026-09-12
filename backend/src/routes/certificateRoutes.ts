import { Router } from 'express';
import { getAllCertificates, getCertificateById } from '../controllers/certificateController';

const router = Router();

router.get('/', getAllCertificates);
router.get('/:certId', getCertificateById);

export default router;
