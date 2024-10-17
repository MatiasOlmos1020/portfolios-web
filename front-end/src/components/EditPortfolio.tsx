import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { createPortfolio, getPortfolioByID } from '../services/portfolioService';
import ImageUploader from './ImagesUploader';
import CustomCkeditor from './Ckeditor';

const EditPortfolio = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [imagesID, setImagesID] = useState<string>(''); // Aquí almacenaremos las URLs de las imágenes subidas
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const imageUploaderRef = useRef<any>(null); // Referencia a ImageUploader
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      // Cargar el portfolio usando el ID
      preparePortfolio(id);
    }
  }, [id]);

  const preparePortfolio = async (id: string) => {
    try {
      const portfolioData = await getPortfolioByID(id);
      setTitle(portfolioData.title);
      setLink(portfolioData.link);
      setDescription(portfolioData.description); // Set description
    } catch {
      console.log("Error al cargar el portfolio");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      let uploadedImageURLs;
      // Llamamos a la función de subida de imágenes expuesta en ImageUploader
      if (imageUploaderRef.current) {
        uploadedImageURLs = await imageUploaderRef.current.handleImageUpload(); // Aquí llamas a la función de subida
        setImagesID(uploadedImageURLs._id); // Guardamos las URLs de las imágenes subidas
      }

      if (uploadedImageURLs && uploadedImageURLs._id) {
        await createPortfolio({ title, description, link, imagesID: uploadedImageURLs._id });
        setSuccess(true);
        setTitle('');
        setDescription('');
        setLink('');
        setImagesID(''); // Limpiamos las imágenes
      }
    } catch (error) {
      setError('Error al añadir el portfolio. Inténtalo de nuevo.');
    }
  };

  return (
    <div>
      <h2>Editar Portfolio</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>Portfolio añadido con éxito</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Título:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="description">Descripción:</label>
          <CustomCkeditor
            initialData={description} // Pass initial description here
            onChange={(event: any, editor: any) => {
              const data = editor.getData();
              setDescription(data);
            }}
          />
        </div>

        <div>
          <label htmlFor="link">Enlace:</label>
          <input
            type="text"
            id="link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="images">Imagenes:</label>
          <ImageUploader ref={imageUploaderRef} />
        </div>

        <button type="submit">Guardar Portfolio</button>
      </form>
    </div>
  );
};

export default EditPortfolio;