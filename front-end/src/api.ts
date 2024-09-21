import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000'; // Cambia esto según tu configuración

export const fetchPortfolioItems = async () => {
    try {
    const response = await axios.get(`${API_BASE_URL}/api/projects`);
    return response.data;
  } catch (error) {
    console.error('Error fetching portfolio items:', error);
    throw error;
  }
};

