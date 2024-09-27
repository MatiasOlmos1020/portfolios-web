import { Router } from 'express';
import { handleUploadImages } from '../controllers/imagesController';
import { uploadImages } from '../controllers/imagesController'; // Asegúrate de que esto esté presente

const router = Router();

router.post('/upload', uploadImages, handleUploadImages); // Upload y handler en la misma ruta

export default router;
