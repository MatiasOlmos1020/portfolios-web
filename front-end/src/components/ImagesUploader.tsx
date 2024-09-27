import React, { useState, useImperativeHandle, forwardRef } from 'react';
import { uploadImages } from '../services/imageService';

// Añadimos forwardRef para exponer métodos
const ImageUploader = forwardRef((props, ref) => {
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const selectedImages = Array.from(files);
      setImages(selectedImages);

      const previews = selectedImages.map(file => URL.createObjectURL(file));
      setImagePreviews(previews);
    }
  };

  const handleImageUpload = async () => {
    try {
      // Llamada al servicio para subir las imágenes y obtener las URLs
      const imageUrls = await uploadImages(images);
      return imageUrls; // Devolver las URLs de las imágenes para ser usadas fuera del componente
    } catch (error) {
      console.error('Error al subir las imágenes:', error);
      return [];
    }
  };

  // Exponemos la función handleUpload a través de useImperativeHandle
  useImperativeHandle(ref, () => ({
    handleImageUpload, // Esto permitirá que otros componentes llamen a handleUpload
  }));

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
    </div>
  );
});

export default ImageUploader;
