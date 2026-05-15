// ══ DATA.JS — Arrays de datos (simulan respuestas de API) ══════════

const FLOTA = [
  {mat:'EC-AAA', mod:'A350-900',  fab:'Airbus',     op:'Aerofly',     pax:348, bus:31, tur:317, anio:2020, base:'Madrid T4',    estado:'Operativo'},
  {mat:'EC-AAB', mod:'A350-900',  fab:'Airbus',     op:'Aerofly',     pax:348, bus:31, tur:317, anio:2021, base:'Madrid T4',    estado:'Operativo'},
  {mat:'EC-AAC', mod:'A321XLR',   fab:'Airbus',     op:'Aerofly',     pax:220, bus:16, tur:204, anio:2024, base:'Madrid T4',    estado:'Operativo'},
  {mat:'EC-AAD', mod:'A321XLR',   fab:'Airbus',     op:'Aerofly',     pax:220, bus:16, tur:204, anio:2024, base:'Barcelona T1', estado:'Operativo'},
  {mat:'EC-AAE', mod:'A321-200',  fab:'Airbus',     op:'Aerofly',     pax:196, bus:16, tur:180, anio:2015, base:'Madrid T4',    estado:'Operativo'},
  {mat:'EC-AAF', mod:'A321-200',  fab:'Airbus',     op:'Aerofly',     pax:196, bus:16, tur:180, anio:2014, base:'Madrid T4',    estado:'En mantenimiento'},
  {mat:'EC-AAG', mod:'A320-200',  fab:'Airbus',     op:'Aerofly',     pax:162, bus:12, tur:150, anio:2012, base:'Madrid T4',    estado:'Operativo'},
  {mat:'EC-AAH', mod:'A320-200',  fab:'Airbus',     op:'Aerofly',     pax:162, bus:12, tur:150, anio:2013, base:'Barcelona T1', estado:'Operativo'},
  {mat:'EC-AAI', mod:'A320-200',  fab:'Airbus',     op:'Aerofly',     pax:162, bus:12, tur:150, anio:2011, base:'Madrid T4',    estado:'AOG'},
  {mat:'EC-LTQ', mod:'ATR 72-600',fab:'ATR',        op:'Air Nostrum', pax:70,  bus:0,  tur:70,  anio:2016, base:'Valencia',     estado:'Operativo'},
  {mat:'EC-MQP', mod:'ATR 72-600',fab:'ATR',        op:'Air Nostrum', pax:70,  bus:0,  tur:70,  anio:2018, base:'Valencia',     estado:'Operativo'},
  {mat:'EC-LNN', mod:'CRJ-1000',  fab:'Bombardier', op:'Air Nostrum', pax:100, bus:0,  tur:100, anio:2014, base:'Valencia',     estado:'Operativo'},
  {mat:'EC-LMM', mod:'CRJ-1000',  fab:'Bombardier', op:'Air Nostrum', pax:100, bus:0,  tur:100, anio:2015, base:'Valencia',     estado:'En mantenimiento'},
];

const VUELOS = [
  {num:'AF2350', ori:'MAD', dst:'JFK · Nueva York',       mat:'EC-AAA', mod:'A350-900',  sal:'10:15', lle:'13:30',   tipo:'Intercontinental', gds:'Amadeus', estado:'En hora'},
  {num:'AF1234', ori:'MAD', dst:'BCN · Barcelona',        mat:'EC-AAG', mod:'A320-200',  sal:'10:40', lle:'11:45',   tipo:'Nacional',          gds:'Gaudi',   estado:'En hora'},
  {num:'AF5678', ori:'MAD', dst:'LHR · Londres',          mat:'EC-AAE', mod:'A321-200',  sal:'11:05', lle:'13:05',   tipo:'Internacional',     gds:'Amadeus', estado:'Retrasado'},
  {num:'AF8901', ori:'MAD', dst:'MEX · Ciudad de México', mat:'EC-AAB', mod:'A350-900',  sal:'11:30', lle:'19:45',   tipo:'Intercontinental',  gds:'Amadeus', estado:'En hora'},
  {num:'AF2234', ori:'MAD', dst:'SVQ · Sevilla',          mat:'EC-AAH', mod:'A320-200',  sal:'12:00', lle:'13:00',   tipo:'Nacional',          gds:'Gaudi',   estado:'Previsto'},
  {num:'AF3345', ori:'BCN', dst:'MAD · Madrid',           mat:'EC-AAD', mod:'A321XLR',   sal:'09:30', lle:'10:35',   tipo:'Nacional',          gds:'Gaudi',   estado:'Aterrizado'},
  {num:'AF4456', ori:'MAD', dst:'VLC · Valencia',         mat:'EC-LTQ', mod:'ATR 72-600',sal:'14:00', lle:'14:55',   tipo:'Nacional',          gds:'Gaudi',   estado:'Previsto'},
  {num:'AF5567', ori:'VLC', dst:'MAD · Madrid',           mat:'EC-LNN', mod:'CRJ-1000',  sal:'08:30', lle:'09:25',   tipo:'Nacional',          gds:'Gaudi',   estado:'Aterrizado'},
];

const PERSONAL = [
  {id:'AF-001', nom:'Carlos Ruiz Méndez',    rol:'Comandante',           cat:'Pilotos', depto:'Operaciones de Vuelo', base:'Madrid T4',    lic:'ATPL-A', estado:'Activo'},
  {id:'AF-002', nom:'Isabel Molina Vera',    rol:'Comandante',           cat:'Pilotos', depto:'Operaciones de Vuelo', base:'Barcelona T1', lic:'ATPL-A', estado:'Activo'},
  {id:'AF-003', nom:'Juan Pérez Sánchez',    rol:'Copiloto',             cat:'Pilotos', depto:'Operaciones de Vuelo', base:'Madrid T4',    lic:'CPL-A',  estado:'Activo'},
  {id:'AF-004', nom:'Laura Fernández Gil',   rol:'Copiloto',             cat:'Pilotos', depto:'Operaciones de Vuelo', base:'Barcelona T1', lic:'CPL-A',  estado:'Activo'},
  {id:'AF-010', nom:'Sofía Torres Blanco',   rol:'Jefe de Cabina',       cat:'TCP',     depto:'Cabina',               base:'Madrid T4',    lic:'CCA',    estado:'Activo'},
  {id:'AF-011', nom:'Pedro Vega Sanz',       rol:'TCP',                  cat:'TCP',     depto:'Cabina',               base:'Madrid T4',    lic:'CCA',    estado:'Activo'},
  {id:'AF-012', nom:'Ana Serrano Pardo',     rol:'TCP',                  cat:'TCP',     depto:'Cabina',               base:'Barcelona T1', lic:'CCA',    estado:'Activo'},
  {id:'AF-013', nom:'Marta López Ruiz',      rol:'TCP',                  cat:'TCP',     depto:'Cabina',               base:'Madrid T4',    lic:'CCA',    estado:'Baja temporal'},
  {id:'AF-020', nom:'María García Cruz',     rol:'Agente de Facturación',cat:'Tierra',  depto:'Handling',             base:'Madrid T4',    lic:'—',      estado:'Activo'},
  {id:'AF-021', nom:'Luis Martínez Díaz',    rol:'Agente de Embarque',   cat:'Tierra',  depto:'Handling',             base:'Madrid T4',    lic:'—',      estado:'Activo'},
  {id:'AF-022', nom:'Carmen Jiménez Vega',   rol:'Agente de Facturación',cat:'Tierra',  depto:'Handling',             base:'Barcelona T1', lic:'—',      estado:'Activo'},
  {id:'AF-030', nom:'Roberto López Gil',     rol:'Agente de Rampa',      cat:'Rampa',   depto:'Ops. de Tierra',       base:'Madrid T4',    lic:'—',      estado:'Activo'},
  {id:'AF-031', nom:'Carmen Díaz Navarro',   rol:'Agente de Rampa',      cat:'Rampa',   depto:'Ops. de Tierra',       base:'Barcelona T1', lic:'—',      estado:'Activo'},
  {id:'AF-040', nom:'Elena Castro Moreno',   rol:'Agente UM',            cat:'UM',      depto:'Servicios Especiales', base:'Madrid T4',    lic:'—',      estado:'Activo'},
  {id:'AF-041', nom:'Fernando Blanco Ruiz',  rol:'Agente UM',            cat:'UM',      depto:'Servicios Especiales', base:'Barcelona T1', lic:'—',      estado:'Activo'},
  {id:'AF-050', nom:'Lucía Romero Castro',   rol:'Asistente PMR',        cat:'PMR',     depto:'Servicios Especiales', base:'Madrid T4',    lic:'—',      estado:'Activo'},
  {id:'AF-051', nom:'Marcos Jiménez Alba',   rol:'Asistente PMR',        cat:'PMR',     depto:'Servicios Especiales', base:'Madrid T4',    lic:'—',      estado:'Activo'},
];

const CLIENTES = [
  {id:'CLI-001', nom:'María López García',   edad:34, tarjeta:'AF-GOLD-001234', status:'Oro',    vuelos:48},
  {id:'CLI-002', nom:'Juan Rodríguez Pérez', edad:45, tarjeta:'AF-SILV-002345', status:'Plata',  vuelos:24},
  {id:'CLI-003', nom:'Ana García Sánchez',   edad:28, tarjeta:'AF-BASE-003456', status:'Normal', vuelos:8},
  {id:'CLI-004', nom:'Pedro Martínez Ruiz',  edad:62, tarjeta:'AF-GOLD-004567', status:'Oro',    vuelos:65},
  {id:'CLI-005', nom:'Sofía Fernández Díaz', edad:19, tarjeta:'AF-BASE-005678', status:'Normal', vuelos:3},
  {id:'CLI-006', nom:'Carlos Torres Vega',   edad:38, tarjeta:'AF-SILV-006789', status:'Plata',  vuelos:31},
  {id:'CLI-007', nom:'Laura Romero Castro',  edad:51, tarjeta:'AF-GOLD-007890', status:'Oro',    vuelos:72},
  {id:'CLI-008', nom:'David Blanco López',   edad:29, tarjeta:'AF-BASE-008901', status:'Normal', vuelos:5},
];

const SERVICIOS_UM = [
  {id:'UM-001', menor:'Alejandro García', edad:8,  vuelo:'AF1234', ruta:'MAD→BCN', contacto:'Rosa García · +34 612 345 678',   nota:'Alérgico a frutos secos',   agente:'AF-040', estado:'Pendiente'},
  {id:'UM-002', menor:'Lucía Martínez',  edad:11, vuelo:'AF2350', ruta:'MAD→JFK', contacto:'Carlos Martínez · +1 212 555 0123',nota:'Primera vez viajando sola', agente:'AF-040', estado:'En vuelo'},
  {id:'UM-003', menor:'Pablo Ruiz',      edad:9,  vuelo:'AF3345', ruta:'BCN→MAD', contacto:'Ana Ruiz · +34 634 567 890',       nota:'—',                         agente:'AF-041', estado:'Entregado'},
];

const SERVICIOS_PMR = [
  {id:'PMR-001', pasajero:'Carmen Rodríguez', vuelo:'AF1234', ruta:'MAD→BCN', asistencia:'Silla de ruedas · WCHR', agente:'AF-050', estado:'Pendiente'},
  {id:'PMR-002', pasajero:'José García Sanz', vuelo:'AF5678', ruta:'MAD→LHR', asistencia:'Silla de ruedas · WCHC', agente:'AF-050', estado:'Embarcado'},
  {id:'PMR-003', pasajero:'María Torres',     vuelo:'AF2350', ruta:'MAD→JFK', asistencia:'Asistencia visual · BLND', agente:'AF-051', estado:'En vuelo'},
];

const TECNOLOGIAS = [
  {nombre:'Amadeus Altéa',tipo:'GDS / PSS',   desc:'Sistema de distribución global (GDS) y Passenger Service System. Gestión de reservas, inventario de vuelos y control de pasajeros en rutas internacionales y europeas.',estado:'Operativo',version:'Altéa 23.1',  uso:'Rutas internacionales'},
  {nombre:'Gaudi DCS',    tipo:'DCS',          desc:'Departure Control System para operaciones domésticas. Control de check-in, asignación de asientos, emisión de tarjetas de embarque y control de carga.',           estado:'Operativo',version:'Gaudi 5.4',     uso:'Rutas nacionales'},
  {nombre:'ACARS',        tipo:'Comunicaciones',desc:'Aircraft Communications Addressing and Reporting System. Mensajería digital entre aeronave y control de tierra. Informes de posición, clima y datos técnicos.',    estado:'Operativo',version:'VHF / SATCOM',  uso:'Flota completa'},
  {nombre:'CUTE / CUSS',  tipo:'Infraestructura',desc:'Common Use Terminal Equipment y quioscos de auto check-in. Puestos compartidos en los aeropuertos para facturación, emisión de tarjetas y gestión de pasajeros.',estado:'Operativo',version:'CUTE 3.0',      uso:'MAD · BCN · VLC'},
  {nombre:'iBUS',         tipo:'Operaciones',  desc:'Information Bus de operaciones en aeropuerto. Integración de datos entre puertas de embarque, rampa y control de operaciones en tiempo real.',                      estado:'Operativo',version:'iBUS 2.8',      uso:'MAD · BCN'},
  {nombre:'AMOS MRO',     tipo:'Mantenimiento',desc:'Aircraft Maintenance and Operations System. Gestión integral de mantenimiento de flota: órdenes de trabajo, airworthiness, historial técnico y planificación.',     estado:'Operativo',version:'AMOS 21.1',     uso:'Hangar MAD'},
];

const USERS = {
  admin:    {pass:'admin123', level:0, name:'Administrador',    role:'NIVEL 0 · ADMIN'},
  director: {pass:'dir123',  level:1, name:'Carlos Rodríguez', role:'NIVEL 1 · DIRECTOR'},
  jefe:     {pass:'jefe123', level:2, name:'Ana Martínez',     role:'NIVEL 2 · JEFE BASE'},
  agente:   {pass:'ag123',   level:3, name:'Pedro García',     role:'NIVEL 3 · AGENTE'},
};

const MENU = [
  {id:'dashboard',    icon:'◈', label:'Panel de control',    min:3, sec:'sec-dashboard'},
  {sep:'Operaciones', min:3},
  {id:'flota',        icon:'✈', label:'Flota de aeronaves',  min:3, sec:'sec-flota'},
  {id:'vuelos',       icon:'🛫',label:'Vuelos del día',      min:3, sec:'sec-vuelos'},
  {id:'tecnologias',  icon:'⬡', label:'Tecnologías',         min:3, sec:'sec-tecnologias'},
  {sep:'Personal',    min:2},
  {id:'personal',     icon:'👥',label:'Personal',            min:2, sec:'sec-personal'},
  {id:'servicios',    icon:'◎', label:'Servicios UM · PMR',  min:2, sec:'sec-servicios'},
  {sep:'Clientes',    min:3},
  {id:'clientes',     icon:'◆', label:'Clientes',            min:3, sec:'sec-clientes'},
  {sep:'Informes',    min:1},
  {id:'estadisticas', icon:'▣', label:'Estadísticas',        min:1, sec:'sec-estadisticas'},
  {sep:'Sistema',     min:0},
  {id:'admin',        icon:'◆', label:'Administración DDL',  min:0, sec:'sec-admin'},
  {id:'usuarios',     icon:'◈', label:'Usuarios del sistema',min:0, sec:'sec-usuarios'},
];
