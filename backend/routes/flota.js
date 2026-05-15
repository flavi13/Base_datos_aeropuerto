// ══ ROUTES/FLOTA.JS ═══════════════════════════════════════════════
import { Router } from 'express';
import pool       from '../config/db.js';
import { verifyToken, requireLevel } from '../middleware/auth.js';

const router = Router();
router.use(verifyToken); // all flota routes require login (any level)

// GET /api/flota — list with optional filters
router.get('/', async (req, res) => {
  try {
    const { mat, mod, op, estado } = req.query;
    const conditions = [];
    const params     = [];

    if (mat)    { params.push(`%${mat.toUpperCase()}%`); conditions.push(`a.matricula ILIKE $${params.length}`); }
    if (mod)    { params.push(mod);                       conditions.push(`ma.nombre_modelo = $${params.length}`); }
    if (op)     { params.push(op);                        conditions.push(`a.operador = $${params.length}`); }
    if (estado) { params.push(estado);                    conditions.push(`a.estado = $${params.length}`); }

    const where = conditions.length ? 'WHERE ' + conditions.join(' AND ') : '';

    const { rows } = await pool.query(`
      SELECT a.matricula   AS mat,
             ma.nombre_modelo AS mod,
             ma.fabricante    AS fab,
             a.operador       AS op,
             ma.capacidad_total AS pax,
             ma.capacidad_biz   AS bus,
             ma.capacidad_eco   AS tur,
             a.anio_fabricacion AS anio,
             b.nombre           AS base,
             a.estado
      FROM   AVION a
      JOIN   MODELO_AVION ma ON ma.id_modelo = a.id_modelo
      JOIN   BASE_OPERATIVA b ON b.id_base  = a.id_base
      ${where}
      ORDER  BY a.matricula
    `, params);

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener flota' });
  }
});

// GET /api/flota/:matricula — single aircraft
router.get('/:matricula', async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT a.*, ma.nombre_modelo, ma.fabricante, b.nombre AS base_nombre
      FROM   AVION a
      JOIN   MODELO_AVION ma ON ma.id_modelo = a.id_modelo
      JOIN   BASE_OPERATIVA b ON b.id_base   = a.id_base
      WHERE  a.matricula = $1
    `, [req.params.matricula.toUpperCase()]);

    if (!rows.length) return res.status(404).json({ error: 'Aeronave no encontrada' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener aeronave' });
  }
});

// PATCH /api/flota/:matricula/estado — update status (jefe o superior)
router.patch('/:matricula/estado', requireLevel(2), async (req, res) => {
  try {
    const { estado } = req.body;
    const allowed = ['Operativo', 'En mantenimiento', 'AOG'];
    if (!allowed.includes(estado)) return res.status(400).json({ error: 'Estado no válido' });

    const { rowCount } = await pool.query(
      'UPDATE AVION SET estado = $1 WHERE matricula = $2',
      [estado, req.params.matricula.toUpperCase()]
    );
    if (!rowCount) return res.status(404).json({ error: 'Aeronave no encontrada' });
    res.json({ message: 'Estado actualizado' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al actualizar estado' });
  }
});

export default router;
