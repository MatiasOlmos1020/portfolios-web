import axios from 'axios';
import { PortfolioItem } from '../types';

const API_BASE_URL = 'http://localhost:5000'; // Cambia esto según tu configuración

// Función para obtener los items del portfolio
export const fetchPortfolioItems = async (): Promise<PortfolioItem[]> => {
  try {
    const response = await axios.get<PortfolioItem[]>(`${API_BASE_URL}/api/portfolios`);
    return response.data;
  } catch (error) {
    console.error('Error fetching portfolio items:', error);
    throw error;
  }
};
