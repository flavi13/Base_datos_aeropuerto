-- ══ QUERIES/FLOTA.SQL ════════════════════════════════════════════

-- Lista completa de flota con modelo y base
SELECT a.matricula,
       ma.nombre_modelo,
       ma.fabricante,
       a.operador,
       ma.capacidad_total  AS pax,
       ma.capacidad_biz    AS business,
       ma.capacidad_eco    AS turista,
       a.anio_fabricacion,
       b.nombre            AS base,
       a.estado
FROM   AVION a
JOIN   MODELO_AVION   ma ON ma.id_modelo = a.id_modelo
JOIN   BASE_OPERATIVA b  ON b.id_base   = a.id_base
ORDER  BY a.matricula;

-- Flota por modelo (resumen operativo)
SELECT ma.nombre_modelo,
       COUNT(*)                                         AS total,
       COUNT(*) FILTER (WHERE a.estado = 'Operativo')  AS operativas,
       COUNT(*) FILTER (WHERE a.estado = 'En mantenimiento') AS en_mant,
       COUNT(*) FILTER (WHERE a.estado = 'AOG')        AS aog,
       ROUND(100.0 * COUNT(*) FILTER (WHERE a.estado = 'Operativo') / COUNT(*), 1) AS pct_disponible
FROM   AVION a
JOIN   MODELO_AVION ma ON ma.id_modelo = a.id_modelo
GROUP  BY ma.nombre_modelo
ORDER  BY ma.nombre_modelo;

-- Aeronaves por operador
SELECT a.operador,
       COUNT(*) AS total,
       COUNT(*) FILTER (WHERE a.estado = 'Operativo') AS operativas
FROM   AVION a
GROUP  BY a.operador;
