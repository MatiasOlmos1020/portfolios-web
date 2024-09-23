import axios from 'axios';
import { PortfolioItem } from '../types';
import API_BASE_URL from '../config/config';

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

export const createPortfolio = async (data: { title: string; description: string; link: string }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/portfolios`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
