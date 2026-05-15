// ══ UI.JS — Helpers: pills, toast, modales DDL ════════════════════

// ── Status → pill class map ─────────────────────────────────────
const STATUS_PILL = {
  'Operativo':'p-green', 'Aterrizado':'p-green', 'Activo':'p-green',
  'En hora':'p-green',   'Entregado':'p-green',
  'En mantenimiento':'p-orange', 'Retrasado':'p-orange',
  'Baja temporal':'p-orange',    'Embarcado':'p-orange', 'En vuelo':'p-orange',
  'AOG':'p-red',     'Urgente':'p-red',    'Cancelado':'p-red',
  'Previsto':'p-gray', 'Pendiente':'p-amber',
  'Oro':'p-gold',    'Plata':'p-silver',   'Normal':'p-gray',
};

function pill(t) {
  return `<span class="pill ${STATUS_PILL[t] || 'p-gray'}">${t}</span>`;
}

function empty(cols) {
  return `<tr><td colspan="${cols}" style="text-align:center;color:var(--gray);padding:20px;font-family:var(--mono);font-size:11px">SIN RESULTADOS</td></tr>`;
}

// ── Toast ───────────────────────────────────────────────────────
let _toastTimer;
function toast(msg, type = 'ok') {
  const el = document.getElementById('toast');
  el.textContent = (type === 'ok' ? '✓ ' : '✗ ') + msg;
  el.className = `show ${type}`;
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => { el.className = ''; }, 2800);
}

// ── DDL Modal definitions ───────────────────────────────────────
const MODALS = {
  create: {
    title: 'CREATE TABLE',
    btn: `<button class="btn-cancel" id="modal-cancel">Cancelar</button>
          <button class="btn-ok"     id="modal-ok"    >Crear</button>`,
    body: `<label>Nombre de la tabla</label>
           <input type="text" id="d-name" placeholder="ej. INCIDENCIA_VUELO">
           <label>Columnas (SQL)</label>
           <textarea id="d-cols" placeholder="id INT PRIMARY KEY,&#10;descripcion TEXT"></textarea>`,
  },
  alter: {
    title: 'ALTER TABLE',
    btn: `<button class="btn-cancel" id="modal-cancel">Cancelar</button>
          <button class="btn-ok"     id="modal-ok"    >Ejecutar</button>`,
    body: `<label>Tabla</label>
           <select id="d-tbl">
             <option>MODELO_AVION</option><option>BASE_OPERATIVA</option>
             <option>AVION</option><option>RUTA</option><option>VUELO</option>
             <option>DEPARTAMENTO</option><option>EMPLEADO</option>
             <option>CLIENTE</option><option>RESERVA</option>
             <option>ASIGNACION_VUELO</option><option>SERVICIO_ESPECIAL</option>
           </select>
           <label>Operación</label>
           <textarea id="d-op" placeholder="ADD COLUMN nueva_col VARCHAR(50)"></textarea>`,
  },
  drop: {
    title: 'DROP TABLE',
    btn: `<button class="btn-cancel" id="modal-cancel">Cancelar</button>
          <button class="btn-del"    id="modal-ok"    >Eliminar</button>`,
    body: `<label>Tabla a eliminar</label>
           <select id="d-drp">
             <option>MODELO_AVION</option><option>BASE_OPERATIVA</option>
             <option>AVION</option><option>RUTA</option><option>VUELO</option>
             <option>DEPARTAMENTO</option><option>EMPLEADO</option>
             <option>CLIENTE</option><option>RESERVA</option>
             <option>ASIGNACION_VUELO</option><option>SERVICIO_ESPECIAL</option>
           </select>
           <label style="color:#EF9A9A;margin-top:14px">⚠ Esta operación es irreversible.</label>`,
  },
};

let _currentModalType = null;

function openModal(type) {
  _currentModalType = type;
  const m = MODALS[type];
  document.getElementById('modal-title').textContent   = m.title;
  document.getElementById('modal-body').innerHTML      = m.body;
  document.getElementById('modal-actions').innerHTML   = m.btn;
  document.getElementById('modal-overlay').classList.add('open');

  document.getElementById('modal-cancel').addEventListener('click', closeModal);
  document.getElementById('modal-ok').addEventListener('click', () => execDDL(_currentModalType));
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('open');
  _currentModalType = null;
}

function closeModalBg(e) {
  if (e.target === document.getElementById('modal-overlay')) closeModal();
}

function execDDL(action) {
  let sql = '';
  if (action === 'create') {
    const n = (document.getElementById('d-name').value.trim() || 'NUEVA_TABLA').toUpperCase();
    const c = document.getElementById('d-cols').value.trim() || 'id INT PRIMARY KEY';
    sql = `<span class="kw">CREATE TABLE</span> <span class="tbl">${n}</span> (\n  ${c.split('\n').join('\n  ')}\n);\n\n<span class="cmt">-- ✓ ${n} creada · 0.04s</span>`;
  } else if (action === 'alter') {
    const t = document.getElementById('d-tbl').value;
    const o = document.getElementById('d-op').value.trim() || 'ADD COLUMN nueva_col VARCHAR(50)';
    sql = `<span class="kw">ALTER TABLE</span> <span class="tbl">${t}</span>\n  ${o};\n\n<span class="cmt">-- ✓ Modificada · 0.12s</span>`;
  } else {
    const t = document.getElementById('d-drp').value;
    sql = `<span class="kw">DROP TABLE IF EXISTS</span> <span class="tbl">${t}</span>;\n\n<span class="cmt">-- ✓ Eliminada · 0.02s</span>`;
  }
  document.getElementById('sql-console').innerHTML = sql;
  closeModal();
  toast('DDL ejecutado', 'ok');
}

// ── Wire up modal overlay background click ──────────────────────
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('modal-overlay').addEventListener('click', closeModalBg);

  // DDL card clicks
  document.querySelectorAll('.ddl-card[data-modal]').forEach(card => {
    card.addEventListener('click', () => openModal(card.dataset.modal));
  });
});
