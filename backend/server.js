// ══ SERVER.JS — Express app ════════════════════════════════════════
import express from 'express';
import cors    from 'cors';
import path    from 'path';
import { fileURLToPath } from 'url';

import authRoutes     from './routes/auth.js';
import flotaRoutes    from './routes/flota.js';
import vuelosRoutes   from './routes/vuelos.js';
import personalRoutes from './routes/personal.js';
import clientesRoutes from './routes/clientes.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(cors());
app.use(express.json());

// Serve frontend static files
app.use(express.static(path.join(__dirname, '../frontend')));

// API routes
app.use('/api/auth',     authRoutes);
app.use('/api/flota',    flotaRoutes);
app.use('/api/vuelos',   vuelosRoutes);
app.use('/api/personal', personalRoutes);
app.use('/api/clientes', clientesRoutes);

// Fallback: serve index.html for any unmatched route (SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Aerofly server running on http://localhost:${PORT}`));
