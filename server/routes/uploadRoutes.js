import { Router } from 'express';
import { protect, adminOnly } from '../middleware/auth.js';
import { upload, handleUpload, getBatch } from '../controllers/uploadController.js';

const router = Router();
router.post('/', protect, adminOnly, upload.single('file'), handleUpload);
router.get('/:batchId', protect, adminOnly, getBatch);

export default router;