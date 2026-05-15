// ══ ROUTES/VUELOS.JS ══════════════════════════════════════════════
import { Router } from 'express';
import pool       from '../config/db.js';
import { verifyToken, requireLevel } from '../middleware/auth.js';

const router = Router();
router.use(verifyToken);

// GET /api/vuelos — today's flights with optional filters
router.get('/', async (req, res) => {
  try {
    const { num, tipo, gds, estado } = req.query;
    const conditions = [`DATE(v.fecha_salida) = CURRENT_DATE`];
    const params     = [];

    if (num)    { params.push(`%${num.toUpperCase()}%`); conditions.push(`v.numero_vuelo ILIKE $${params.length}`); }
    if (tipo)   { params.push(tipo);   conditions.push(`r.tipo = $${params.length}`); }
    if (gds)    { params.push(gds);    conditions.push(`v.sistema_gds = $${params.length}`); }
    if (estado) { params.push(estado); conditions.push(`v.estado = $${params.length}`); }

    const { rows } = await pool.query(`
      SELECT v.numero_vuelo  AS num,
             r.iata_origen   AS ori,
             r.iata_destino  AS dst,
             v.matricula     AS mat,
             ma.nombre_modelo AS mod,
             TO_CHAR(v.fecha_salida, 'HH24:MI') AS sal,
             TO_CHAR(v.fecha_llegada,'HH24:MI') AS lle,
             r.tipo,
             v.sistema_gds   AS gds,
             v.estado
      FROM   VUELO v
      JOIN   RUTA r          ON r.id_ruta   = v.id_ruta
      JOIN   AVION a         ON a.matricula = v.matricula
      JOIN   MODELO_AVION ma ON ma.id_modelo = a.id_modelo
      WHERE  ${conditions.join(' AND ')}
      ORDER  BY v.fecha_salida
    `, params);

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener vuelos' });
  }
});

// PATCH /api/vuelos/:id/estado — update flight status (jefe o superior)
router.patch('/:id/estado', requireLevel(2), async (req, res) => {
  try {
    const { estado } = req.body;
    const allowed = ['Previsto', 'En hora', 'Retrasado', 'Embarcado', 'Aterrizado', 'Cancelado'];
    if (!allowed.includes(estado)) return res.status(400).json({ error: 'Estado no válido' });

    const { rowCount } = await pool.query(
      'UPDATE VUELO SET estado = $1 WHERE id_vuelo = $2',
      [estado, req.params.id]
    );
    if (!rowCount) return res.status(404).json({ error: 'Vuelo no encontrado' });
    res.json({ message: 'Estado del vuelo actualizado' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al actualizar vuelo' });
  }
});

export default router;
