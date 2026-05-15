// ══ APP.JS — Navegación, renderizado, filtros ═════════════════════

let _catPersonal = '';
let _catCliente  = '';

// ── Navigation ──────────────────────────────────────────────────
function navigate(sec) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-item:not(.locked)').forEach(n => n.classList.remove('active'));
  document.getElementById(sec).classList.add('active');
  const m = MENU.find(x => x.sec === sec);
  if (m) {
    const el = document.getElementById('ni-' + m.id);
    if (el) el.classList.add('active');
  }
}

// ── Build sidebar UI after login ─────────────────────────────────
function buildUI() {
  const lv = currentUser.level;
  document.getElementById('sb-name').textContent = currentUser.name;
  document.getElementById('sb-role').textContent = currentUser.role;

  const bCls = ['lb0','lb1','lb2','lb3'][lv];
  const badge = document.getElementById('dash-badge');
  badge.className   = `access-badge lbadge ${bCls}`;
  badge.textContent = currentUser.role;
  document.getElementById('dash-date').textContent =
    new Date().toLocaleDateString('es-ES', {weekday:'long', day:'numeric', month:'long'});

  // Hide sensitive columns for agente (level 3)
  if (lv >= 3) {
    document.getElementById('th-edad').style.display    = 'none';
    document.getElementById('th-tarjeta').style.display = 'none';
  }

  // Build nav items
  let html = '';
  for (const m of MENU) {
    if (m.sep !== undefined) {
      if (lv <= m.min) html += `<div class="nav-group">${m.sep}</div>`;
    } else if (lv <= m.min) {
      html += `<div class="nav-item" id="ni-${m.id}" data-sec="${m.sec}">
        <span class="nav-icon">${m.icon}</span>${m.label}
      </div>`;
    } else {
      html += `<div class="nav-item locked">
        <span class="nav-icon">${m.icon}</span>${m.label}
        <span class="nav-lock">🔒</span>
      </div>`;
    }
  }
  document.getElementById('sidebar-nav').innerHTML = html;

  // Attach nav click events
  document.querySelectorAll('.nav-item[data-sec]').forEach(el => {
    el.addEventListener('click', () => navigate(el.dataset.sec));
  });
}

// ── Render all tables ────────────────────────────────────────────
function renderAll() {
  renderFlota(FLOTA);
  renderVuelos(VUELOS);
  renderPersonal(PERSONAL);
  renderClientes(CLIENTES);
  renderUM(SERVICIOS_UM);
  renderPMR(SERVICIOS_PMR);
  renderTech();
}

function renderFlota(data) {
  document.getElementById('tbody-flota').innerHTML = data.map(a => `
    <tr>
      <td class="mono-cell">${a.mat}</td>
      <td>${a.mod}</td>
      <td>${a.fab}</td>
      <td><span class="pill ${a.op === 'Aerofly' ? 'p-blue' : 'p-gray'}">${a.op}</span></td>
      <td>${a.pax}</td>
      <td>${a.bus || '—'}</td>
      <td>${a.tur}</td>
      <td class="mono-cell">${a.anio}</td>
      <td>${a.base}</td>
      <td>${pill(a.estado)}</td>
    </tr>`
  ).join('') || empty(10);
}

function renderVuelos(data) {
  document.getElementById('tbody-vuelos').innerHTML = data.map(v => `
    <tr>
      <td class="mono-cell">${v.num}</td>
      <td class="mono-cell">${v.ori}</td>
      <td>${v.dst}</td>
      <td class="mono-cell">${v.mat}</td>
      <td>${v.mod}</td>
      <td class="mono-cell">${v.sal}</td>
      <td class="mono-cell">${v.lle}</td>
      <td>${v.tipo}</td>
      <td><span class="pill ${v.gds === 'Amadeus' ? 'p-blue' : 'p-gray'}">${v.gds}</span></td>
      <td>${pill(v.estado)}</td>
    </tr>`
  ).join('') || empty(10);
}

function renderPersonal(data) {
  document.getElementById('tbody-personal').innerHTML = data.map(e => `
    <tr>
      <td class="mono-cell">${e.id}</td>
      <td>${e.nom}</td>
      <td>${e.rol}</td>
      <td><span class="pill p-gray">${e.cat}</span></td>
      <td>${e.depto}</td>
      <td>${e.base}</td>
      <td class="mono-cell">${e.lic}</td>
      <td>${pill(e.estado)}</td>
    </tr>`
  ).join('') || empty(8);
}

function renderClientes(data) {
  const lv = currentUser ? currentUser.level : 3;
  document.getElementById('tbody-clientes').innerHTML = data.map(c => `
    <tr>
      <td class="mono-cell">${c.id}</td>
      <td>${c.nom}</td>
      ${lv < 3 ? `<td>${c.edad}</td>` : ''}
      ${lv < 3 ? `<td class="mono-cell">${c.tarjeta}</td>` : ''}
      <td>${pill(c.status)}</td>
      <td class="mono-cell">${c.vuelos}</td>
    </tr>`
  ).join('') || empty(lv < 3 ? 6 : 4);
}

function renderUM(data) {
  document.getElementById('tbody-um').innerHTML = data.map(u => `
    <tr>
      <td class="mono-cell">${u.id}</td>
      <td>${u.menor}</td>
      <td class="mono-cell">${u.edad}</td>
      <td class="mono-cell">${u.vuelo}</td>
      <td>${u.ruta}</td>
      <td style="font-size:10px">${u.contacto}</td>
      <td class="mono-cell">${u.agente}</td>
      <td>${pill(u.estado)}</td>
    </tr>`
  ).join('') || empty(8);
}

function renderPMR(data) {
  document.getElementById('tbody-pmr').innerHTML = data.map(p => `
    <tr>
      <td class="mono-cell">${p.id}</td>
      <td>${p.pasajero}</td>
      <td class="mono-cell">${p.vuelo}</td>
      <td>${p.ruta}</td>
      <td style="font-size:10px">${p.asistencia}</td>
      <td class="mono-cell">${p.agente}</td>
      <td>${pill(p.estado)}</td>
    </tr>`
  ).join('') || empty(7);
}

function renderTech() {
  document.getElementById('tech-grid').innerHTML = TECNOLOGIAS.map(t => `
    <div class="tech-card">
      <div class="tc-tipo">${t.tipo}</div>
      <div class="tc-nombre">${t.nombre}</div>
      <div class="tc-desc">${t.desc}</div>
      <div class="tc-meta">
        <span class="tc-badge">v ${t.version}</span>
        <span class="tc-badge">${t.uso}</span>
        <span class="pill p-green" style="font-size:8px">● ${t.estado}</span>
      </div>
    </div>`
  ).join('');
}

// ── Filters ──────────────────────────────────────────────────────
function filterFlota() {
  const mat = document.getElementById('f-fl-mat').value.toUpperCase();
  const mod = document.getElementById('f-fl-mod').value;
  const op  = document.getElementById('f-fl-op').value;
  const est = document.getElementById('f-fl-est').value;
  const r = FLOTA.filter(a =>
    (!mat || a.mat.includes(mat)) &&
    (!mod || a.mod === mod) &&
    (!op  || a.op  === op)  &&
    (!est || a.estado === est)
  );
  renderFlota(r);
  toast(`${r.length} aeronave(s) encontrada(s)`);
}

function filterVuelos() {
  const num  = document.getElementById('f-vl-num').value.toUpperCase();
  const tipo = document.getElementById('f-vl-tipo').value;
  const gds  = document.getElementById('f-vl-gds').value;
  const est  = document.getElementById('f-vl-est').value;
  const r = VUELOS.filter(v =>
    (!num  || v.num.includes(num) || v.dst.toLowerCase().includes(num.toLowerCase())) &&
    (!tipo || v.tipo   === tipo) &&
    (!gds  || v.gds    === gds)  &&
    (!est  || v.estado === est)
  );
  renderVuelos(r);
  toast(`${r.length} vuelo(s) encontrado(s)`);
}

function filterPersonal() {
  const nom  = document.getElementById('f-em-nombre').value.toLowerCase();
  const base = document.getElementById('f-em-base').value;
  const r = PERSONAL.filter(e =>
    (!nom  || e.nom.toLowerCase().includes(nom)) &&
    (!base || e.base === base) &&
    (!_catPersonal || e.cat === _catPersonal)
  );
  renderPersonal(r);
  toast(`${r.length} empleado(s) encontrado(s)`);
}

function filterClientes() {
  const nom = document.getElementById('f-cl-nom').value.toLowerCase();
  const r = CLIENTES.filter(c =>
    (!nom         || c.nom.toLowerCase().includes(nom)) &&
    (!_catCliente || c.status === _catCliente)
  );
  renderClientes(r);
  toast(`${r.length} cliente(s) encontrado(s)`);
}

// ── Wire up filter buttons & category bars ───────────────────────
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('btn-filter-flota').addEventListener('click', filterFlota);
  document.getElementById('btn-filter-vuelos').addEventListener('click', filterVuelos);
  document.getElementById('btn-filter-personal').addEventListener('click', filterPersonal);
  document.getElementById('btn-filter-clientes').addEventListener('click', filterClientes);

  // Personal category bar
  document.querySelectorAll('#cat-bar-personal .cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#cat-bar-personal .cat-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      _catPersonal = btn.dataset.cat;
      filterPersonal();
    });
  });

  // Clientes category bar
  document.querySelectorAll('#cat-bar-clientes .cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#cat-bar-clientes .cat-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      _catCliente = btn.dataset.cat;
      filterClientes();
    });
  });
});
