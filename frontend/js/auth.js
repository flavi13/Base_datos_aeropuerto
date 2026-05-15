// ══ AUTH.JS — Login / Logout / Control de sesión ══════════════════

let currentUser = null;

function doLogin() {
  const u   = document.getElementById('l-user').value.trim();
  const p   = document.getElementById('l-pass').value;
  const err = document.getElementById('login-error');

  if (USERS[u] && USERS[u].pass === p) {
    currentUser = { ...USERS[u], user: u };
    err.style.display = 'none';
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('app').style.display = 'block';
    buildUI();
    renderAll();
    navigate('sec-dashboard');
  } else {
    err.style.display = 'block';
    document.getElementById('l-pass').value = '';
  }
}

function doLogout() {
  currentUser = null;
  document.getElementById('app').style.display = 'none';
  document.getElementById('login-screen').style.display = 'flex';
  document.getElementById('l-user').value = '';
  document.getElementById('l-pass').value = '';
}

// ── Keyboard shortcuts ──────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('l-pass').addEventListener('keydown', e => {
    if (e.key === 'Enter') doLogin();
  });
  document.getElementById('l-user').addEventListener('keydown', e => {
    if (e.key === 'Enter') document.getElementById('l-pass').focus();
  });
  document.getElementById('btn-login').addEventListener('click', doLogin);
  document.getElementById('btn-logout').addEventListener('click', doLogout);
});
