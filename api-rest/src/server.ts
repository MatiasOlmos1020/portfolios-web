import express, {Request,Response} from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Datos de ejemplo
const projects = [
  { id: 1, title: "Project One", description: "My first project", link: "#" },
  { id: 2, title: "Project Two", description: "Another project", link: "#" }
];

// Rutas
app.get('/api/projects', (req: Request, res: Response) => {
  res.json(projects);
});

app.post('/api/contact', (req: Request, res: Response) => {
    const { name, email, message } = req.body;
    // Aquí puedes manejar el mensaje (guardar en base de datos, enviar correo, etc.)
    res.send('Message received!');
  });

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});