import { Router } from 'express';
import { getImages, getImagesByID, handleUploadImages } from '../controllers/imagesController';
import { uploadImages } from '../controllers/imagesController'; // Asegúrate de que esto esté presente

const router = Router();

router.post('/upload', uploadImages, handleUploadImages); // Upload y handler en la misma ruta
router.get('/:id', getImagesByID); 
router.get('/', getImages); 

export default router;
