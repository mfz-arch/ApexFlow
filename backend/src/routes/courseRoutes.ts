import { Router } from 'express';
import {
  getAllCourses,
  getCourseBySlug,
  enrollInCourse,
  completeLesson,
  submitFinalTest,
} from '../controllers/courseController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.get('/', getAllCourses);
router.get('/:slug', getCourseBySlug);
router.post('/:slug/enroll', authenticateToken, enrollInCourse);
router.post('/:slug/lessons/:lessonId/complete', authenticateToken, completeLesson);
router.post('/:slug/test/submit', authenticateToken, submitFinalTest);

export default router;
