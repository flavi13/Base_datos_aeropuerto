// ══ MIDDLEWARE/AUTH.JS — JWT + control de nivel de acceso ═════════
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'aerofly_dev_secret_change_in_production';

/**
 * verifyToken — Verifica el JWT en el header Authorization.
 * Adjunta req.user = { user, name, role, level } si es válido.
 */
export function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ error: 'No token provided' });

  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

/**
 * requireLevel(n) — Middleware de nivel mínimo de acceso.
 * Nivel 0 = Admin, 1 = Director, 2 = Jefe, 3 = Agente
 * Un nivel más bajo tiene más privilegios (0 accede a todo).
 *
 * @param {number} minLevel  Nivel máximo permitido para acceder (inclusive)
 *
 * Uso: router.get('/ruta', verifyToken, requireLevel(1), handler)
 */
export function requireLevel(minLevel) {
  return (req, res, next) => {
    if (req.user.level <= minLevel) {
      next();
    } else {
      res.status(403).json({ error: 'Acceso denegado: nivel insuficiente' });
    }
  };
}

export { JWT_SECRET };
