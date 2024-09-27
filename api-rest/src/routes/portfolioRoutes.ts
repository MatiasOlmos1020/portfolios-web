import { Router } from 'express';
import {
  getPortfolios,
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
} from '../controllers/portfoliosController';

const router = Router();

// Ruta para obtener todos los portfolios
router.get('/', getPortfolios);

// Ruta para crear un nuevo portfolio
router.post('/', createPortfolio);

// Ruta para actualizar un portfolio existente
router.put('/:id', updatePortfolio);

// Ruta para eliminar un portfolio
router.delete('/:id', deletePortfolio);

export default router;
