import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import portfolioRoutes from './routes/portfolioRoutes';
import imageRoutes from './routes/imageRoutes'
import connectDB from './db';

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Coneccion a la DB
connectDB();

// Usar rutas
app.use('/api/portfolios', portfolioRoutes);
app.use('/api/images', imageRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
