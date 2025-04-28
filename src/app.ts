import express from 'express';
import cors from 'cors';
import estudiantesRouter from './routes/estudiantes'; 

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));


app.use('/estudiantes', estudiantesRouter);

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
