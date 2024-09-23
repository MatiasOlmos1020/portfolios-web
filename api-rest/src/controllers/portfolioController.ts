import { Request, Response } from 'express';
import Portfolio from '../models/portfolioModel';

// Obtener todos los portfolios
export const getPortfolios = async (req: Request, res: Response) => {
  try {
    const portfolios = await Portfolio.find();
    res.json(portfolios);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Unknown error occurred' });
    }
  }
};

// Agregar un nuevo portfolio
export const createPortfolio = async (req: Request, res: Response) => {
  const { title, description, link } = req.body;

  // Validación básica
  if (!title || !description || !link) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const portfolio = new Portfolio({ title, description, link });

  try {
    const savedPortfolio = await portfolio.save();
    res.status(201).json(savedPortfolio);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Unknown error occurred' });
    }
  }
};

// Actualizar un portfolio
export const updatePortfolio = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, link } = req.body;

  try {
    const updatedPortfolio = await Portfolio.findByIdAndUpdate(
      id,
      { title, description, link },
      { new: true } // Para devolver el documento actualizado
    );
    if (!updatedPortfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }
    res.json(updatedPortfolio);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Unknown error occurred' });
    }
  }
};

// Eliminar un portfolio
export const deletePortfolio = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedPortfolio = await Portfolio.findByIdAndDelete(id);
    if (!deletedPortfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }
    res.json({ message: 'Portfolio deleted successfully' });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Unknown error occurred' });
    }
  }
};
