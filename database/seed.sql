-- ══ SEED.SQL — Datos de demostración · Aerofly App ════════════════

-- ── MODELO_AVION ───────────────────────────────────────────────────
INSERT INTO MODELO_AVION (nombre_modelo, fabricante, capacidad_total, capacidad_biz, capacidad_eco) VALUES
  ('A350-900',   'Airbus',     348, 31,  317),
  ('A321XLR',    'Airbus',     220, 16,  204),
  ('A321-200',   'Airbus',     196, 16,  180),
  ('A320-200',   'Airbus',     162, 12,  150),
  ('ATR 72-600', 'ATR',         70,  0,   70),
  ('CRJ-1000',   'Bombardier', 100,  0,  100);

-- ── BASE_OPERATIVA ─────────────────────────────────────────────────
INSERT INTO BASE_OPERATIVA (nombre, iata, pais) VALUES
  ('Madrid T4',    'MAD', 'España'),
  ('Barcelona T1', 'BCN', 'España'),
  ('Valencia',     'VLC', 'España'),
  ('Londres Heathrow', 'LHR', 'Reino Unido');

-- ── RUTA ───────────────────────────────────────────────────────────
INSERT INTO RUTA (iata_origen, iata_destino, tipo, distancia_km) VALUES
  ('MAD', 'JFK', 'Intercontinental', 5762),
  ('MAD', 'MEX', 'Intercontinental', 9047),
  ('MAD', 'LHR', 'Internacional',    1264),
  ('MAD', 'BCN', 'Nacional',          491),
  ('MAD', 'SVQ', 'Nacional',          390),
  ('MAD', 'VLC', 'Nacional',          302),
  ('BCN', 'MAD', 'Nacional',          491),
  ('VLC', 'MAD', 'Nacional',          302);

-- ── DEPARTAMENTO ──────────────────────────────────────────────────
INSERT INTO DEPARTAMENTO (nombre) VALUES
  ('Operaciones de Vuelo'),
  ('Cabina'),
  ('Handling'),
  ('Ops. de Tierra'),
  ('Servicios Especiales'),
  ('Administración TI');

-- ── AVION ─────────────────────────────────────────────────────────
INSERT INTO AVION (matricula, id_modelo, id_base, operador, anio_fabricacion, estado) VALUES
  ('EC-AAA', 1, 1, 'Aerofly',     2020, 'Operativo'),
  ('EC-AAB', 1, 1, 'Aerofly',     2021, 'Operativo'),
  ('EC-AAC', 2, 1, 'Aerofly',     2024, 'Operativo'),
  ('EC-AAD', 2, 2, 'Aerofly',     2024, 'Operativo'),
  ('EC-AAE', 3, 1, 'Aerofly',     2015, 'Operativo'),
  ('EC-AAF', 3, 1, 'Aerofly',     2014, 'En mantenimiento'),
  ('EC-AAG', 4, 1, 'Aerofly',     2012, 'Operativo'),
  ('EC-AAH', 4, 2, 'Aerofly',     2013, 'Operativo'),
  ('EC-AAI', 4, 1, 'Aerofly',     2011, 'AOG'),
  ('EC-LTQ', 5, 3, 'Air Nostrum', 2016, 'Operativo'),
  ('EC-MQP', 5, 3, 'Air Nostrum', 2018, 'Operativo'),
  ('EC-LNN', 6, 3, 'Air Nostrum', 2014, 'Operativo'),
  ('EC-LMM', 6, 3, 'Air Nostrum', 2015, 'En mantenimiento');

-- ── VUELO (fecha = today) ─────────────────────────────────────────
INSERT INTO VUELO (numero_vuelo, id_ruta, matricula, id_base, fecha_salida, fecha_llegada, sistema_gds, estado) VALUES
  ('AF2350', 1, 'EC-AAA', 1, NOW()::DATE + TIME '10:15', NOW()::DATE + TIME '13:30', 'Amadeus', 'En hora'),
  ('AF1234', 4, 'EC-AAG', 1, NOW()::DATE + TIME '10:40', NOW()::DATE + TIME '11:45', 'Gaudi',   'En hora'),
  ('AF5678', 3, 'EC-AAE', 1, NOW()::DATE + TIME '11:05', NOW()::DATE + TIME '13:05', 'Amadeus', 'Retrasado'),
  ('AF8901', 2, 'EC-AAB', 1, NOW()::DATE + TIME '11:30', NOW()::DATE + TIME '19:45', 'Amadeus', 'En hora'),
  ('AF2234', 5, 'EC-AAH', 1, NOW()::DATE + TIME '12:00', NOW()::DATE + TIME '13:00', 'Gaudi',   'Previsto'),
  ('AF3345', 7, 'EC-AAD', 2, NOW()::DATE + TIME '09:30', NOW()::DATE + TIME '10:35', 'Gaudi',   'Aterrizado'),
  ('AF4456', 6, 'EC-LTQ', 1, NOW()::DATE + TIME '14:00', NOW()::DATE + TIME '14:55', 'Gaudi',   'Previsto'),
  ('AF5567', 8, 'EC-LNN', 3, NOW()::DATE + TIME '08:30', NOW()::DATE + TIME '09:25', 'Gaudi',   'Aterrizado');

-- ── EMPLEADO ──────────────────────────────────────────────────────
INSERT INTO EMPLEADO (id_empleado, nombre_completo, rol, categoria, id_departamento, id_base, licencia, estado) VALUES
  ('AF-001', 'Carlos Ruiz Méndez',    'Comandante',            'Pilotos', 1, 1, 'ATPL-A', 'Activo'),
  ('AF-002', 'Isabel Molina Vera',    'Comandante',            'Pilotos', 1, 2, 'ATPL-A', 'Activo'),
  ('AF-003', 'Juan Pérez Sánchez',    'Copiloto',              'Pilotos', 1, 1, 'CPL-A',  'Activo'),
  ('AF-004', 'Laura Fernández Gil',   'Copiloto',              'Pilotos', 1, 2, 'CPL-A',  'Activo'),
  ('AF-010', 'Sofía Torres Blanco',   'Jefe de Cabina',        'TCP',     2, 1, 'CCA',    'Activo'),
  ('AF-011', 'Pedro Vega Sanz',       'TCP',                   'TCP',     2, 1, 'CCA',    'Activo'),
  ('AF-012', 'Ana Serrano Pardo',     'TCP',                   'TCP',     2, 2, 'CCA',    'Activo'),
  ('AF-013', 'Marta López Ruiz',      'TCP',                   'TCP',     2, 1, 'CCA',    'Baja temporal'),
  ('AF-020', 'María García Cruz',     'Agente de Facturación', 'Tierra',  3, 1, '—',      'Activo'),
  ('AF-021', 'Luis Martínez Díaz',    'Agente de Embarque',    'Tierra',  3, 1, '—',      'Activo'),
  ('AF-022', 'Carmen Jiménez Vega',   'Agente de Facturación', 'Tierra',  3, 2, '—',      'Activo'),
  ('AF-030', 'Roberto López Gil',     'Agente de Rampa',       'Rampa',   4, 1, '—',      'Activo'),
  ('AF-031', 'Carmen Díaz Navarro',   'Agente de Rampa',       'Rampa',   4, 2, '—',      'Activo'),
  ('AF-040', 'Elena Castro Moreno',   'Agente UM',             'UM',      5, 1, '—',      'Activo'),
  ('AF-041', 'Fernando Blanco Ruiz',  'Agente UM',             'UM',      5, 2, '—',      'Activo'),
  ('AF-050', 'Lucía Romero Castro',   'Asistente PMR',         'PMR',     5, 1, '—',      'Activo'),
  ('AF-051', 'Marcos Jiménez Alba',   'Asistente PMR',         'PMR',     5, 1, '—',      'Activo');

-- ── CLIENTE ───────────────────────────────────────────────────────
INSERT INTO CLIENTE (id_cliente, nombre_completo, edad, numero_tarjeta, estado_tarjeta, vuelos_anio) VALUES
  ('CLI-001', 'María López García',   34, 'AF-GOLD-001234', 'Oro',    48),
  ('CLI-002', 'Juan Rodríguez Pérez', 45, 'AF-SILV-002345', 'Plata',  24),
  ('CLI-003', 'Ana García Sánchez',   28, 'AF-BASE-003456', 'Normal',  8),
  ('CLI-004', 'Pedro Martínez Ruiz',  62, 'AF-GOLD-004567', 'Oro',    65),
  ('CLI-005', 'Sofía Fernández Díaz', 19, 'AF-BASE-005678', 'Normal',  3),
  ('CLI-006', 'Carlos Torres Vega',   38, 'AF-SILV-006789', 'Plata',  31),
  ('CLI-007', 'Laura Romero Castro',  51, 'AF-GOLD-007890', 'Oro',    72),
  ('CLI-008', 'David Blanco López',   29, 'AF-BASE-008901', 'Normal',  5);

-- ── SERVICIO_ESPECIAL (UM + PMR) ───────────────────────────────────
-- Vuelo AF1234 id=2, AF2350 id=1, AF3345 id=6, AF5678 id=3
INSERT INTO SERVICIO_ESPECIAL (tipo, id_vuelo, id_cliente, id_empleado, descripcion, estado) VALUES
  ('UM',  2, 'CLI-003', 'AF-040', 'Alejandro García (8) — Alérgico a frutos secos',    'Pendiente'),
  ('UM',  1, 'CLI-005', 'AF-040', 'Lucía Martínez (11) — Primera vez viajando sola',   'En vuelo'),
  ('UM',  6, 'CLI-008', 'AF-041', 'Pablo Ruiz (9)',                                     'Entregado'),
  ('PMR', 2, 'CLI-001', 'AF-050', 'Silla de ruedas · WCHR',                             'Pendiente'),
  ('PMR', 3, 'CLI-002', 'AF-050', 'Silla de ruedas · WCHC',                             'Embarcado'),
  ('PMR', 1, 'CLI-007', 'AF-051', 'Asistencia visual · BLND',                           'En vuelo');
