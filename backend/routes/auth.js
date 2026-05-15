// ══ ROUTES/AUTH.JS — Login / logout ═══════════════════════════════
import { Router } from 'express';
import jwt        from 'jsonwebtoken';
import { JWT_SECRET, verifyToken } from '../middleware/auth.js';

const router = Router();

// Hardcoded users — replace with DB lookup in production
const USERS = {
  admin:    { pass: 'admin123', level: 0, name: 'Administrador',    role: 'NIVEL 0 · ADMIN' },
  director: { pass: 'dir123',  level: 1, name: 'Carlos Rodríguez', role: 'NIVEL 1 · DIRECTOR' },
  jefe:     { pass: 'jefe123', level: 2, name: 'Ana Martínez',     role: 'NIVEL 2 · JEFE BASE' },
  agente:   { pass: 'ag123',   level: 3, name: 'Pedro García',     role: 'NIVEL 3 · AGENTE' },
};

// POST /api/auth/login
router.post('/login', (req, res) => {
  const { user, pass } = req.body;
  const u = USERS[user];
  if (!u || u.pass !== pass) {
    return res.status(401).json({ error: 'Credenciales incorrectas' });
  }
  const payload = { user, name: u.name, role: u.role, level: u.level };
  const token   = jwt.sign(payload, JWT_SECRET, { expiresIn: '8h' });
  res.json({ token, user: payload });
});

// POST /api/auth/logout — client just discards the token; this is for logging
router.post('/logout', verifyToken, (req, res) => {
  res.json({ message: `Sesión cerrada para ${req.user.user}` });
});

// GET /api/auth/me — verify current token
router.get('/me', verifyToken, (req, res) => {
  res.json({ user: req.user });
});

export default router;
