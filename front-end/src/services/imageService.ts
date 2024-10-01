import axios from 'axios';
import { ImageItem } from '../types';

export const uploadImages = async (images: File[]) => {
  const formData = new FormData();
  // Añadimos todas las imágenes al FormData
  images.forEach(image => {
    formData.append('images', image);
  });

  try {
    // Realizamos la petición POST para subir las imágenes
    const response = await axios.post(`${process.env.RREACT_APP_API_BASE_URL}/api/images/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error al subir las imágenes:', error);
    throw error;
  }
};

export const getImageByID = async (id : string) => {
  
  try {
    // Realizamos la petición POST para subir las imágenes
    const response = await axios.get(`${process.env.RREACT_APP_API_BASE_URL}/api/images/${id}`);

    return response.data;
  } catch (error) {
    console.error('Error al subir las imágenes:', error);
    throw error;
  }
};
