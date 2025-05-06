import { Router } from 'express';
import { pool } from '../db';
import { buildLogger } from '../plugins/logger.plugin';
import { Logger } from 'winston';

const router = Router();


router.post('/', async (req, res) => {
  const logger =  buildLogger("Create-user");
  try {
    const { nombre, edad, carrera, ciudad, estado } = req.body;
    await pool.query(
      'INSERT INTO estudiantes (nombre, edad, carrera, ciudad, estado) VALUES (?, ?, ?, ?, ?)',
      [nombre, edad, carrera, ciudad, estado]
    );
    logger.log('Usuario creado')
    res.status(201).json({ message: 'Usuario creado' });
  } catch (err: any) {
    logger.error("Error al crear usuario")
    res.status(500).json({ error: err.message });
  }
});


router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM estudiantes');
    res.json(rows);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

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
