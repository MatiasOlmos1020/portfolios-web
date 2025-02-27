import { Router } from 'express';
import { createPayment, createPreference, status } from '../controllers/mpController';

const router = Router();

router.post('/create-payment', createPayment); 
router.post('/create-preference', createPreference); 
router.post('/status', status);

export default router;