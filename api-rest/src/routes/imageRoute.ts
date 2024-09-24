import { Router } from 'express';
import { handleUploadImages } from '../controllers/imageController';

const router = Router();

router.post('/upload', handleUploadImages);

export default router;
