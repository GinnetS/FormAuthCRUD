import { Router } from 'express';
import { pool } from '../db';

const router = Router();

// Crear estudiante
router.post('/', async (req, res) => {
  try {
    const { nombre, edad, carrera, ciudad, estado } = req.body;
    console.log('Datos recibidos:', req.body); // 
    await pool.query(
      'INSERT INTO estudiantes (nombre, edad, carrera, ciudad, estado) VALUES (?, ?, ?, ?, ?)',
      [nombre, edad, carrera, ciudad, estado]
    );
    res.status(201).json({ message: 'Estudiante creado' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Listar estudiantes
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM estudiantes');
    res.json(rows);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Actualizar estudiante
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, edad, carrera, ciudad, estado } = req.body;
    await pool.query(
      'UPDATE estudiantes SET nombre=?, edad=?, carrera=?, ciudad=?, estado=? WHERE id=?',
      [nombre, edad, carrera, ciudad, estado, id]
    );
    res.json({ message: 'Estudiante actualizado' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Eliminar estudiante
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM estudiantes WHERE id=?', [id]);
    res.json({ message: 'Estudiante eliminado' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
