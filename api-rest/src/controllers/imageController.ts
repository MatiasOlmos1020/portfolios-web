import { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';

// Configuración de Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Asegúrate de que esta carpeta exista
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Cambia el nombre del archivo si es necesario
  },
});

const upload = multer({ storage });

export const uploadImages = upload.array('images'); // Cambia a .single si solo es una imagen

// Endpoint para subir imágenes
export const handleUploadImages = (req: Request, res: Response) => {
  const files = req.files as Express.Multer.File[];
  if (!files || files.length === 0) {
    return res.status(400).json({ message: 'No files uploaded' });
  }

  const imageUrls = files.map(file => `/uploads/${file.filename}`); // Genera las URLs
  res.json(imageUrls); // Devuelve las URLs
};
