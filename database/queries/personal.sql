-- ══ QUERIES/PERSONAL.SQL ═════════════════════════════════════════

-- Lista completa de empleados
SELECT e.id_empleado,
       e.nombre_completo,
       e.rol,
       e.categoria,
       d.nombre  AS departamento,
       b.nombre  AS base,
       e.licencia,
       e.estado
FROM   EMPLEADO e
JOIN   DEPARTAMENTO   d ON d.id_departamento = e.id_departamento
JOIN   BASE_OPERATIVA b ON b.id_base         = e.id_base
ORDER  BY e.id_empleado;

-- Distribución de personal por categoría y base
SELECT e.categoria,
       b.nombre AS base,
       COUNT(*) AS total
FROM   EMPLEADO e
JOIN   BASE_OPERATIVA b ON b.id_base = e.id_base
WHERE  e.estado = 'Activo'
GROUP  BY e.categoria, b.nombre
ORDER  BY e.categoria, b.nombre;

-- Empleados asignados a vuelos de hoy
SELECT av.id_vuelo,
       v.numero_vuelo,
       e.id_empleado,
       e.nombre_completo,
       av.funcion
FROM   ASIGNACION_VUELO av
JOIN   VUELO   v ON v.id_vuelo   = av.id_vuelo
JOIN   EMPLEADO e ON e.id_empleado = av.id_empleado
WHERE  DATE(v.fecha_salida) = CURRENT_DATE
ORDER  BY v.fecha_salida;
