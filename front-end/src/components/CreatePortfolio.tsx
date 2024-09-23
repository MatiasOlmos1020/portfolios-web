import { useState } from 'react';
import { createPortfolio } from '../services/portfolioService';

const CreatePortfolio = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      await createPortfolio({ title, description, link });
      setSuccess(true);
      setTitle('');
      setDescription('');
      setLink('');
    } catch (error) {
      setError('Error al añadir el portfolio. Inténtalo de nuevo.');
    }
  };

  return (
    <div>
      <h2>Añadir Nuevo Portfolio</h2>
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
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
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

        <button type="submit">Añadir Portfolio</button>
      </form>
    </div>
  );
};

export default CreatePortfolio;
