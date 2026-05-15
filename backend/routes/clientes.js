// ══ ROUTES/CLIENTES.JS ════════════════════════════════════════════
import { Router } from 'express';
import pool       from '../config/db.js';
import { verifyToken, requireLevel } from '../middleware/auth.js';

const router = Router();
router.use(verifyToken); // any logged-in user can access basic client data

// GET /api/clientes — client list
// Sensitive fields (edad, tarjeta) only returned for level < 3
router.get('/', async (req, res) => {
  try {
    const { nombre, status } = req.query;
    const conditions = [];
    const params     = [];

    if (nombre) { params.push(`%${nombre}%`); conditions.push(`c.nombre_completo ILIKE $${params.length}`); }
    if (status) { params.push(status);        conditions.push(`c.estado_tarjeta = $${params.length}`); }

    const where = conditions.length ? 'WHERE ' + conditions.join(' AND ') : '';

    const { rows } = await pool.query(`
      SELECT c.id_cliente     AS id,
             c.nombre_completo AS nom,
             c.estado_tarjeta  AS status,
             c.vuelos_anio     AS vuelos
             ${req.user.level < 3 ? ', c.edad, c.numero_tarjeta AS tarjeta' : ''}
      FROM   CLIENTE c
      ${where}
      ORDER  BY c.id_cliente
    `, params);

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener clientes' });
  }
});

// GET /api/clientes/:id — single client (jefe o superior)
router.get('/:id', requireLevel(2), async (req, res) => {
  try {
    const { rows } = await pool.query(
      'SELECT * FROM CLIENTE WHERE id_cliente = $1',
      [req.params.id]
    );
    if (!rows.length) return res.status(404).json({ error: 'Cliente no encontrado' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener cliente' });
  }
});

export default router;
