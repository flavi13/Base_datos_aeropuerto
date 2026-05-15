# ✈ Aerofly Company — Sistema de Gestión Interna

Página web del servicio de administración (database) de una compañía de vuelos.

---

## Descripción

El escenario planteado para el desarrollo de esta base de datos surge de la necesidad de digitalizar y centralizar la gestión operativa de una compañía aérea ficticia denominada **Aerofly Company**, que opera vuelos nacionales, internacionales e intercontinentales desde sus bases principales en Madrid, Barcelona y Valencia, contando además con una aerolínea regional asociada, Air Nostrum.

La base de datos abarca todas las áreas críticas de la operación: la flota de aeronaves y sus modelos, la planificación y seguimiento de vuelos diarios a través de los sistemas GDS Amadeus y Gaudi, la gestión del personal de vuelo y de tierra organizado por departamentos y bases operativas, la atención a clientes con su programa de fidelización, y la coordinación de servicios especiales como el acompañamiento de menores no acompañados (UM) y la asistencia a pasajeros con movilidad reducida (PMR).

La elección de este sector no es casual — la experiencia previa en el ámbito aeroportuario ha permitido conocer de primera mano cómo se estructuran los procesos internos de una aerolínea, qué datos son verdaderamente relevantes en el día a día operativo y cuáles son las relaciones entre los distintos departamentos, lo que ha sido determinante a la hora de diseñar un modelo de datos coherente, normalizado en BCNF y alineado con la realidad del sector.

---

## Estructura del proyecto

```
aerofly/
├── frontend/
│   ├── index.html          ← HTML limpio (solo estructura)
│   ├── css/
│   │   └── styles.css      ← todos los estilos
│   └── js/
│       ├── data.js         ← arrays de datos (simulan respuestas de API)
│       ├── auth.js         ← login / logout / control de sesión
│       ├── ui.js           ← helpers: pills, toast, modales DDL
│       └── app.js          ← navegación, renderizado, filtros
├── backend/
│   ├── server.js           ← Express app
│   ├── config/db.js        ← conexión PostgreSQL (pg Pool)
│   ├── middleware/auth.js  ← JWT + control de nivel de acceso
│   └── routes/
│       ├── auth.js
│       ├── flota.js
│       ├── vuelos.js
│       ├── personal.js
│       └── clientes.js
└── database/
    ├── schema.sql          ← CREATE TABLE (esquema BCNF completo)
    ├── seed.sql            ← INSERT con todos los datos
    └── queries/
        ├── flota.sql
        ├── vuelos.sql
        ├── personal.sql
        └── clientes.sql
```

---

## Tecnologías utilizadas

| Capa | Tecnología |
|------|-----------|
| Frontend | HTML5, CSS3, JavaScript vanilla |
| Backend | Node.js, Express |
| Base de datos | PostgreSQL 15+ |
| Autenticación | JWT (JSON Web Tokens) |
| GDS simulados | Amadeus, Gaudi |

---

## Normalización de la base de datos

El esquema ha sido diseñado pasando por las tres formas normales hasta llegar a **BCNF**:

### 1FN — Primera Forma Normal
- Todos los valores son atómicos (una sola cosa por celda)
- No hay listas ni grupos repetidos
- Cada tabla tiene clave primaria definida
- Ejemplo: la tripulación de un vuelo no se guarda como `"AF-001, AF-010, AF-011"` en una celda, sino en la tabla `ASIGNACION_VUELO`

### 2FN — Segunda Forma Normal
- Cumple la 1FN
- Todos los atributos dependen de la clave primaria **completa**, no de una parte
- Ejemplo: `nombre_empleado` se elimina de `ASIGNACION_VUELO` porque solo depende de `id_empleado`, no de `(id_vuelo, id_empleado)`

### BCNF — Boyce-Codd Normal Form
- Cumple la 2FN
- Se eliminan todas las dependencias transitivas
- Ejemplo: `nombre_base` se saca de `AVION` y `EMPLEADO` a la tabla `BASE_OPERATIVA`; `iata_origen/destino` se saca de `VUELO` a la tabla `RUTA`

---

## Tablas del sistema

| Tabla | Descripción | Filas aprox. |
|-------|-------------|-------------|
| `MODELO_AVION` | Modelos de aeronave (A350-900, CRJ-1000...) | 6 |
| `BASE_OPERATIVA` | Bases (Madrid T4, Barcelona T1, Valencia) | 4 |
| `AVION` | Aeronaves individuales con matrícula | 13 |
| `RUTA` | Rutas entre pares de aeropuertos | 8 |
| `VUELO` | Vuelos programados del día | 8 |
| `DEPARTAMENTO` | Departamentos de la compañía | 6 |
| `EMPLEADO` | Personal (pilotos, TCP, tierra, servicios) | 17 |
| `CLIENTE` | Pasajeros registrados con tarjeta de fidelización | 8 |
| `RESERVA` | Reservas de clientes en vuelos | — |
| `ASIGNACION_VUELO` | Asignación de empleados a vuelos | — |
| `SERVICIO_ESPECIAL` | Servicios UM y PMR | 6 |

---

## Niveles de acceso

El sistema tiene 4 niveles de acceso controlados por JWT:

| Usuario | Contraseña | Nivel | Acceso |
|---------|------------|-------|--------|
| `admin` | `admin123` | 0 · Admin | Todo, incluido DDL |
| `director` | `dir123` | 1 · Director | Estadísticas y todo lo inferior |
| `jefe` | `jefe123` | 2 · Jefe de base | Personal, servicios y operaciones |
| `agente` | `ag123` | 3 · Agente | Operaciones básicas |

---

## Instalación y uso

### Requisitos previos
- Node.js 18+
- PostgreSQL 15+

### Pasos

1. Clona el repositorio:
```bash
git clone https://github.com/flavi13/Base_datos_aeropuerto.git
cd Base_datos_aeropuerto
```

2. Instala las dependencias:
```bash
npm install
```

3. Crea la base de datos en PostgreSQL:
```bash
psql -U postgres -c "CREATE DATABASE aerofly_app;"
psql -U postgres -d aerofly_app -f database/schema.sql
psql -U postgres -d aerofly_app -f database/seed.sql
```

4. Configura las variables de entorno (opcional):
```bash
DB_HOST=localhost
DB_PORT=5432
DB_NAME=aerofly_app
DB_USER=aerofly
DB_PASSWORD=aerofly_pass
JWT_SECRET=tu_secreto_aqui
```

5. Arranca el servidor:
```bash
npm start
```

6. Abre el navegador en `http://localhost:3000`

---

## Demo en GitHub Pages

El frontend estático está desplegado en:

🔗 [https://flavi13.github.io/Base_datos_aeropuerto/](https://flavi13.github.io/Base_datos_aeropuerto/)

> El frontend usa datos estáticos en `data.js` — no requiere backend para funcionar en la demo.

---

## Autora

**Flavia Rivero**  
Proyecto de base de datos — Gestión de compañía aérea