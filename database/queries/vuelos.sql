-- ══ QUERIES/VUELOS.SQL ═══════════════════════════════════════════

-- Vuelos de hoy con datos completos
SELECT v.numero_vuelo,
       r.iata_origen,
       r.iata_destino,
       v.matricula,
       ma.nombre_modelo,
       TO_CHAR(v.fecha_salida,  'HH24:MI') AS salida,
       TO_CHAR(v.fecha_llegada, 'HH24:MI') AS llegada,
       r.tipo,
       v.sistema_gds,
       v.estado
FROM   VUELO v
JOIN   RUTA r          ON r.id_ruta   = v.id_ruta
JOIN   AVION a         ON a.matricula = v.matricula
JOIN   MODELO_AVION ma ON ma.id_modelo = a.id_modelo
WHERE  DATE(v.fecha_salida) = CURRENT_DATE
ORDER  BY v.fecha_salida;

-- Rutas más operadas este mes
SELECT r.iata_origen || '–' || r.iata_destino AS ruta,
       COUNT(*) AS vuelos
FROM   VUELO v
JOIN   RUTA r ON r.id_ruta = v.id_ruta
WHERE  DATE_TRUNC('month', v.fecha_salida) = DATE_TRUNC('month', CURRENT_DATE)
GROUP  BY ruta
ORDER  BY vuelos DESC
LIMIT  10;

-- Distribución de vuelos por GDS hoy
SELECT v.sistema_gds, COUNT(*) AS total
FROM   VUELO v
WHERE  DATE(v.fecha_salida) = CURRENT_DATE
GROUP  BY v.sistema_gds;
