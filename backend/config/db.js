// ══ CONFIG/DB.JS — Conexión PostgreSQL (pg Pool) ══════════════════
import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
  host:     process.env.DB_HOST     || 'localhost',
  port:     process.env.DB_PORT     || 5432,
  database: process.env.DB_NAME     || 'aerofly_app',
  user:     process.env.DB_USER     || 'aerofly',
  password: process.env.DB_PASSWORD || 'aerofly_pass',
  max:      10,                 // max connections in pool
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

pool.on('error', (err) => {
  console.error('PostgreSQL pool error:', err);
  process.exit(-1);
});

export default pool;
