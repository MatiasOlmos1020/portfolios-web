import axios from 'axios';
import API_BASE_URL from '../config/config';

export const uploadImages = async (images: File[]) => {
  const formData = new FormData();
  // Añadimos todas las imágenes al FormData
  images.forEach(image => {
    formData.append('images', image);
  });


  try {
    // Realizamos la petición POST para subir las imágenes
    const response = await axios.post(`${API_BASE_URL}/api/images/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const imageUrls = response.data; // Ajusta esto según lo que devuelva tu backend

    return response.data;
    //return "test";
  } catch (error) {
    console.error('Error al subir las imágenes:', error);
    throw error;
  }
};
