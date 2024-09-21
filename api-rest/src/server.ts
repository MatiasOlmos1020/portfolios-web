import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import portfolioRoutes from './routes/portfolios';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Usar rutas
app.use('/api/portfolios', portfolioRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
