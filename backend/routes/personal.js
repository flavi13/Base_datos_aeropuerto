// ══ ROUTES/PERSONAL.JS ════════════════════════════════════════════
import { Router } from 'express';
import pool       from '../config/db.js';
import { verifyToken, requireLevel } from '../middleware/auth.js';

const router = Router();
router.use(verifyToken);
router.use(requireLevel(2)); // Personal: jefe (2) o superior

// GET /api/personal — employee list with optional filters
router.get('/', async (req, res) => {
  try {
    const { nombre, base, cat } = req.query;
    const conditions = [];
    const params     = [];

    if (nombre) { params.push(`%${nombre}%`); conditions.push(`e.nombre_completo ILIKE $${params.length}`); }
    if (base)   { params.push(base);          conditions.push(`b.nombre = $${params.length}`); }
    if (cat)    { params.push(cat);           conditions.push(`e.categoria = $${params.length}`); }

    const where = conditions.length ? 'WHERE ' + conditions.join(' AND ') : '';

    const { rows } = await pool.query(`
      SELECT e.id_empleado  AS id,
             e.nombre_completo AS nom,
             e.rol,
             e.categoria    AS cat,
             d.nombre       AS depto,
             b.nombre       AS base,
             e.licencia     AS lic,
             e.estado
      FROM   EMPLEADO e
      JOIN   DEPARTAMENTO d   ON d.id_departamento = e.id_departamento
      JOIN   BASE_OPERATIVA b ON b.id_base         = e.id_base
      ${where}
      ORDER  BY e.id_empleado
    `, params);

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener personal' });
  }
});

// GET /api/personal/:id — single employee (director or admin only)
router.get('/:id', requireLevel(1), async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT e.*, d.nombre AS departamento, b.nombre AS base_nombre
      FROM   EMPLEADO e
      JOIN   DEPARTAMENTO d   ON d.id_departamento = e.id_departamento
      JOIN   BASE_OPERATIVA b ON b.id_base         = e.id_base
      WHERE  e.id_empleado = $1
    `, [req.params.id]);

    if (!rows.length) return res.status(404).json({ error: 'Empleado no encontrado' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener empleado' });
  }
});

export default router;
