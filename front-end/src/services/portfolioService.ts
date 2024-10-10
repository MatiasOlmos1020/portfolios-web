import axios from 'axios';
import { PortfolioItem } from '../types';
import { ImageItem } from '../types';

// Función para obtener los items del portfolio
export const getAllPortfolios = async (): Promise<PortfolioItem[]> => {
  try {
    const response = await axios.get<PortfolioItem[]>(`${process.env.REACT_APP_API_BASE_URL}/api/portfolios`);
    const portfolioItems = response.data;

    // Usamos Promise.all para asegurarnos de esperar todas las solicitudes asincrónicas
    const updatedPortfolioItems = await Promise.all(
      portfolioItems.map(async (item) => {
        // Obtenemos las imágenes para el portfolio actual
        const portfolioImagesResponse = await axios.get<ImageItem[]>(`${process.env.REACT_APP_API_BASE_URL}/api/images/${item.imagesID}`);
        const portfolioImages = portfolioImagesResponse.data;
        // Añadimos las URLs de las imágenes al portfolio
        return {
          ...item,                // Mantenemos los datos originales del portfolio
          imageUrls: portfolioImages  // Agregamos las URLs de las imágenes
        };
      })
    );
    return updatedPortfolioItems;
  } catch (error) {
    console.error('Error fetching portfolio items:', error);
    throw error;
  }
};

export const createPortfolio = async (data: { title: string; description: string; link: string; imagesID: string;}) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/portfolios`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPortfolioByID = async (id : string) =>{
  try {
    // Realizamos la petición POST para subir las imágenes
    const response = await axios.get<PortfolioItem>(`${process.env.REACT_APP_API_BASE_URL}/api/portfolios/${id}`);

    return response.data;
  } catch (error) {
    console.error('Error al traer los portfolios:', error);
    throw error;
  }
}
