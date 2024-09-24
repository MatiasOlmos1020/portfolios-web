import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import portfolioRoutes from './routes/portfolioRoute';
import imageRoutes from './routes/imageRoute'
import connectDB from './db';

const app = express();
const PORT = process.env.PORT || 5000;

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
