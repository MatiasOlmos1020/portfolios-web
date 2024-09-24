import React, { useState } from 'react';
import axios from 'axios';

const ImageUploader: React.FC = () => {
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [portfolioId, setPortfolioId] = useState<string>(''); // ID del portfolio al que vincular

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const selectedImages = Array.from(files);
      setImages(selectedImages);

      const previews = selectedImages.map(file => URL.createObjectURL(file));
      setImagePreviews(previews);
    }
  };

  const handleUpload = async () => {
    const formData = new FormData();
    images.forEach(image => {
      formData.append('images', image);
    });

    try {
      // Cambia la URL a la de tu API
      const response = await axios.post('http://localhost:5000/api/images/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Asumimos que el backend devuelve las URLs de las imágenes
      const imageUrls = response.data; // Ajusta según lo que devuelva tu backend
      console.log('URLs de imágenes guardadas:', imageUrls);

      // Aquí puedes enviar el portfolioId y las URLs a tu API para guardar la relación
      await axios.post('http://localhost:5000/api/portfolios', {
        portfolioId, // Este sería el ID del portfolio
        imageUrls,   // Array de URLs de las imágenes
      });

    } catch (error) {
      console.error('Error al subir las imágenes:', error);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageChange}
      />
      <div>
        {imagePreviews.map((preview, index) => (
          <img key={index} src={preview} alt={`preview ${index}`} style={{ width: '100px', height: '100px', margin: '5px' }} />
        ))}
      </div>
      <button onClick={handleUpload}>Guardar Imágenes</button>
    </div>
  );
};

export default ImageUploader;
