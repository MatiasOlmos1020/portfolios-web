import { Request, Response } from 'express';
import Image from '../models/imageModel';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Configuración de Multer con una ruta absoluta para la carpeta de 'uploads'
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.resolve(__dirname, '..', '..', 'uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true }); // Crea la carpeta si no existe
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // Nombre de archivo: [timestamp]-[nombre-original]
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });
// Exporta el middleware para subir múltiples imágenes
export const uploadImages = upload.array('images'); // Cambia a .single('image') si subes solo una imagen

// Endpoint para manejar la subida de imágenes
export const handleUploadImages = async (req: Request, res: Response) => {
  
  // Casting de req.files para obtener el arreglo de archivos subidos
  const files = req.files as Express.Multer.File[];

  if (!files || files.length === 0) {
    return res.status(400).json({ message: 'No files uploaded' });
  }

  // Genera las URLs basadas en el nombre del archivo y la ruta donde fueron guardadas
  const URLs = files.map(file => `/uploads/${file.filename}`);
  
  const image = new Image({ URLs });
  try {
    const savedImage = await image.save();
    res.status(201).json(savedImage);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Unknown error occurred' });
    }
  }

  // Devuelve las URLs de las imágenes subidasd
  //return res.json(URLs);
};
