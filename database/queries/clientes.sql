-- ══ QUERIES/CLIENTES.SQL ═════════════════════════════════════════

-- Lista de clientes con datos de fidelización
SELECT c.id_cliente,
       c.nombre_completo,
       c.edad,
       c.numero_tarjeta,
       c.estado_tarjeta,
       c.vuelos_anio
FROM   CLIENTE c
ORDER  BY c.estado_tarjeta DESC, c.vuelos_anio DESC;

-- Distribución por nivel de tarjeta
SELECT estado_tarjeta,
       COUNT(*) AS total,
       AVG(vuelos_anio)::INT AS media_vuelos
FROM   CLIENTE
GROUP  BY estado_tarjeta
ORDER  BY CASE estado_tarjeta WHEN 'Oro' THEN 1 WHEN 'Plata' THEN 2 ELSE 3 END;

-- Servicios especiales activos por cliente
SELECT c.id_cliente,
       c.nombre_completo,
       s.tipo,
       v.numero_vuelo,
       s.descripcion,
       s.estado
FROM   SERVICIO_ESPECIAL s
JOIN   CLIENTE c ON c.id_cliente = s.id_cliente
JOIN   VUELO   v ON v.id_vuelo   = s.id_vuelo
WHERE  DATE(v.fecha_salida) = CURRENT_DATE
ORDER  BY s.tipo, v.fecha_salida;
