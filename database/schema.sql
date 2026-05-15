-- ══ SCHEMA.SQL — Esquema BCNF completo · Aerofly App ══════════════
-- Base de datos: aerofly_app
-- Normalización: BCNF (Boyce-Codd Normal Form)
-- Motor: PostgreSQL 15+

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ── Tablas de referencia (sin FK) ─────────────────────────────────

CREATE TABLE MODELO_AVION (
    id_modelo        SERIAL PRIMARY KEY,
    nombre_modelo    VARCHAR(30)  NOT NULL UNIQUE,   -- 'A350-900', 'CRJ-1000'
    fabricante       VARCHAR(30)  NOT NULL,           -- 'Airbus', 'Bombardier'
    capacidad_total  SMALLINT     NOT NULL CHECK (capacidad_total > 0),
    capacidad_biz    SMALLINT     NOT NULL DEFAULT 0,
    capacidad_eco    SMALLINT     NOT NULL CHECK (capacidad_eco > 0)
);

CREATE TABLE BASE_OPERATIVA (
    id_base     SERIAL PRIMARY KEY,
    nombre      VARCHAR(50)  NOT NULL UNIQUE,   -- 'Madrid T4'
    iata        CHAR(3)      NOT NULL UNIQUE,   -- 'MAD'
    pais        VARCHAR(30)  NOT NULL DEFAULT 'España'
);

CREATE TABLE RUTA (
    id_ruta       SERIAL PRIMARY KEY,
    iata_origen   CHAR(3)     NOT NULL,
    iata_destino  CHAR(3)     NOT NULL,
    tipo          VARCHAR(20) NOT NULL
        CHECK (tipo IN ('Nacional','Internacional','Intercontinental')),
    distancia_km  INT,
    UNIQUE (iata_origen, iata_destino)
);

CREATE TABLE DEPARTAMENTO (
    id_departamento SERIAL PRIMARY KEY,
    nombre          VARCHAR(50) NOT NULL UNIQUE   -- 'Operaciones de Vuelo'
);

-- ── Tablas con FK ─────────────────────────────────────────────────

CREATE TABLE AVION (
    matricula          CHAR(7)     PRIMARY KEY,    -- 'EC-AAA'
    id_modelo          INT         NOT NULL REFERENCES MODELO_AVION  ON UPDATE CASCADE,
    id_base            INT         NOT NULL REFERENCES BASE_OPERATIVA ON UPDATE CASCADE,
    operador           VARCHAR(30) NOT NULL,        -- 'Aerofly' | 'Air Nostrum'
    anio_fabricacion   SMALLINT    NOT NULL,
    estado             VARCHAR(20) NOT NULL DEFAULT 'Operativo'
        CHECK (estado IN ('Operativo','En mantenimiento','AOG'))
);

CREATE TABLE VUELO (
    id_vuelo       SERIAL PRIMARY KEY,
    numero_vuelo   VARCHAR(8)   NOT NULL,           -- 'AF2350'
    id_ruta        INT          NOT NULL REFERENCES RUTA  ON UPDATE CASCADE,
    matricula      CHAR(7)      NOT NULL REFERENCES AVION ON UPDATE CASCADE,
    id_base        INT          NOT NULL REFERENCES BASE_OPERATIVA ON UPDATE CASCADE,
    fecha_salida   TIMESTAMPTZ  NOT NULL,
    fecha_llegada  TIMESTAMPTZ  NOT NULL,
    sistema_gds    VARCHAR(20)  NOT NULL CHECK (sistema_gds IN ('Amadeus','Gaudi')),
    estado         VARCHAR(20)  NOT NULL DEFAULT 'Previsto'
        CHECK (estado IN ('Previsto','En hora','Retrasado','Embarcado','Aterrizado','Cancelado')),
    UNIQUE (numero_vuelo, fecha_salida)
);

CREATE TABLE EMPLEADO (
    id_empleado      VARCHAR(10)  PRIMARY KEY,      -- 'AF-001'
    nombre_completo  VARCHAR(80)  NOT NULL,
    rol              VARCHAR(50)  NOT NULL,
    categoria        VARCHAR(15)  NOT NULL
        CHECK (categoria IN ('Pilotos','TCP','Tierra','Rampa','UM','PMR')),
    id_departamento  INT          NOT NULL REFERENCES DEPARTAMENTO   ON UPDATE CASCADE,
    id_base          INT          NOT NULL REFERENCES BASE_OPERATIVA ON UPDATE CASCADE,
    licencia         VARCHAR(15)  NOT NULL DEFAULT '—',
    estado           VARCHAR(20)  NOT NULL DEFAULT 'Activo'
        CHECK (estado IN ('Activo','Baja temporal','Baja definitiva'))
);

CREATE TABLE CLIENTE (
    id_cliente       VARCHAR(10)  PRIMARY KEY,      -- 'CLI-001'
    nombre_completo  VARCHAR(80)  NOT NULL,
    edad             SMALLINT     NOT NULL CHECK (edad > 0 AND edad < 130),
    numero_tarjeta   VARCHAR(20)  NOT NULL UNIQUE,  -- 'AF-GOLD-001234'
    estado_tarjeta   VARCHAR(10)  NOT NULL DEFAULT 'Normal'
        CHECK (estado_tarjeta IN ('Normal','Plata','Oro')),
    vuelos_anio      SMALLINT     NOT NULL DEFAULT 0
);

CREATE TABLE RESERVA (
    id_reserva  SERIAL      PRIMARY KEY,
    id_vuelo    INT         NOT NULL REFERENCES VUELO   ON UPDATE CASCADE ON DELETE CASCADE,
    id_cliente  VARCHAR(10) NOT NULL REFERENCES CLIENTE ON UPDATE CASCADE,
    asiento     VARCHAR(5),
    clase       VARCHAR(10) NOT NULL DEFAULT 'Turista'
        CHECK (clase IN ('Business','Turista')),
    creada_en   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (id_vuelo, asiento)
);

CREATE TABLE ASIGNACION_VUELO (
    id_asignacion  SERIAL      PRIMARY KEY,
    id_vuelo       INT         NOT NULL REFERENCES VUELO    ON UPDATE CASCADE ON DELETE CASCADE,
    id_empleado    VARCHAR(10) NOT NULL REFERENCES EMPLEADO ON UPDATE CASCADE,
    funcion        VARCHAR(30) NOT NULL,             -- 'Comandante', 'TCP', etc.
    UNIQUE (id_vuelo, id_empleado)
);

CREATE TABLE SERVICIO_ESPECIAL (
    id_servicio  SERIAL      PRIMARY KEY,
    tipo         CHAR(3)     NOT NULL CHECK (tipo IN ('UM','PMR')),
    id_vuelo     INT         NOT NULL REFERENCES VUELO    ON UPDATE CASCADE ON DELETE CASCADE,
    id_cliente   VARCHAR(10) NOT NULL REFERENCES CLIENTE  ON UPDATE CASCADE,
    id_empleado  VARCHAR(10) NOT NULL REFERENCES EMPLEADO ON UPDATE CASCADE,
    descripcion  TEXT,
    estado       VARCHAR(15) NOT NULL DEFAULT 'Pendiente'
        CHECK (estado IN ('Pendiente','En vuelo','Embarcado','Entregado','Cancelado'))
);

-- ── Índices ───────────────────────────────────────────────────────
CREATE INDEX idx_vuelo_fecha     ON VUELO (DATE(fecha_salida));
CREATE INDEX idx_vuelo_numero    ON VUELO (numero_vuelo);
CREATE INDEX idx_avion_estado    ON AVION (estado);
CREATE INDEX idx_empleado_base   ON EMPLEADO (id_base);
CREATE INDEX idx_empleado_cat    ON EMPLEADO (categoria);
CREATE INDEX idx_servicio_tipo   ON SERVICIO_ESPECIAL (tipo);
CREATE INDEX idx_reserva_vuelo   ON RESERVA (id_vuelo);
