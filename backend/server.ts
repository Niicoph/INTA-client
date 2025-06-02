import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import maquinariaRoutes from './routes/maquinaria';
import pasanitizanteRoutes from './routes/pasanitizante';
import pafertilizanteRoutes from './routes/pafertilizante'

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/maquinaria', maquinariaRoutes);
app.use('/api/pasanitizante', pasanitizanteRoutes);
app.use('/api/pafertilizante', pafertilizanteRoutes)

/*
Función para hacer queries en frontend
export function List() {
  const { isPending, error, data } = useQuery({
    queryKey: ['maquinaria|sanitizante|fertilizante'],
    queryFn: () =>
      fetch('http://localhost:3001/api/{endpoint}').then((res) => res.json()),
  });
// {endpoint} puede ser maquinaria/tractores, maquinaria/implementos, pasanitizane y pafertilizante
  if (isPending) return <p>Loading...</p>;
  if (error instanceof Error) return <p>An error has occurred: {error.message}</p>;

  return ( <div> usar data  la estructura del JSON (ej tractor sería {data[x].id|nombre|potencia_CV}) </div>)
*/

app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>API proyecto INTA</title>
        <meta name="title" content="Proyecto INTA">
        <meta name="description" content="Universidad Nacional del ComahueCarrera: Tecnicatura Universitaria en Desarrollo WebMateria: Programación Web AvanzadaAño: 2025">
        <meta name="keywords" content="INTA, UNCOMA, TUDW, PWA, 2025">
        <meta name="robots" content="noindex, follow">
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta name="language" content="Spanish">
        <meta name="author" content="Matías Nicolás Pesce, Franco Fabian Benitez, José Vicente Reyes Castelló">
        <style>
          body { font-family: sans-serif; padding: 2rem; }
          h1 { color: #2c3e50; }
          a { display: block; margin-bottom: 1rem; color: #2980b9; text-decoration: none; font-size: 1.1rem; }
        </style>
      </head>
      <body>
        <h1>🚜 API Proyecto INTA</h1>
        <p>Esta API tiene las siguientes rutas:</p>
        <a href="/api/maquinaria" target="_blank">📦 /api/maquinaria</a>
        <a href="/api/maquinaria/tractores" target="_blank">🚜 /api/maquinaria/tractores</a>
        <a href="/api/maquinaria/implementos" target="_blank">🛠️ /api/maquinaria/implementos</a>
        <a href="/api/pasanitizante" target="_blank">🧪 /api/pasanitizante</a>
        <a href="/api/pafertilizante" target="_blank">🌱 /api/pafertilizante</a>
      </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
