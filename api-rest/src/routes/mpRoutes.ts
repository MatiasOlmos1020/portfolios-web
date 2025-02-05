import { Router } from 'express';
import { createPayment, createPreference } from '../controllers/mpController';

const router = Router();

router.post('/create-payment', createPayment); 
router.post('/create-preference', createPreference); 

export default router;