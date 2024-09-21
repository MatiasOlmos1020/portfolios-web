import { Router } from 'express';
import { getPortfolios } from '../controllers/portfolioController';

const router = Router();

router.get('/', getPortfolios); // Obtener todos los portfolios

export default router;
