/*******************************
 * Credenziali hardcoded (JS)
 *******************************/
const AUTH = {
  // Cambia queste credenziali come vuoi:
  username: 'riccardo',
  password: 'puglia2025'
};

/********************************
 * Login / Logout / Session
 ********************************/
function login() {
  const u = document.getElementById('username').value.trim();
  const p = document.getElementById('password').value;
  const msg = document.getElementById('login-message');

  if (!u || !p) {
    msg.textContent = 'Inserisci username e password.';
    return;
  }
  if (u === AUTH.username && p === AUTH.password) {
    // Salva sessione in localStorage
    localStorage.setItem('wt_logged_in', 'true');
    localStorage.setItem('wt_username', u);
    showApp();
  } else {
    // Messaggio richiesto
    msg.textContent = 'Username o Password non corrette';
  }
}

function showApp() {
  document.getElementById('login-container').style.display = 'none';
  document.getElementById('app-container').style.display = 'block';
  const u = localStorage.getItem('wt_username') || AUTH.username;
  const welcome = document.getElementById('welcome-text');
  if (welcome) welcome.textContent = `Benvenuto, ${u}`;
  // Default day
  showDay('upper1');
  // Inizializza campi
  initExerciseFields();
}

function logout() {
  localStorage.removeItem('wt_logged_in');
  localStorage.removeItem('wt_username');
  // I dati degli esercizi NON vengono rimossi: il dispositivo non dimentica
  document.getElementById('app-container').style.display = 'none';
  document.getElementById('login-container').style.display = 'flex';
  const msg = document.getElementById('login-message');
  if (msg) msg.textContent = '';
}

/********************************
 * Avvio: ripristina sessione
 ********************************/
window.addEventListener('DOMContentLoaded', () => {
  const logged = localStorage.getItem('wt_logged_in') === 'true';
  if (logged) {
    showApp();
  } else {
    document.getElementById('login-container').style.display = 'flex';
    document.getElementById('app-container').style.display = 'none';
  }
});

/********************************
 * Switch dei giorni
 ********************************/
function showDay(dayId) {
  const days = document.querySelectorAll('.day');
  days.forEach(d => d.classList.remove('active'));
  const target = document.getElementById(dayId);
  if (target) target.classList.add('active');
}

/********************************
 * Auto-resize delle note
 ********************************/
function autoResize(textarea) {
  textarea.style.height = 'auto';
  textarea.style.height = textarea.scrollHeight + 'px';
}

/********************************
 * Inizializzazione esercizi
 * Salvataggio persistente (localStorage)
 ********************************/
function initExerciseFields() {
  const exercises = document.querySelectorAll('.exercise');

  exercises.forEach((exercise, index) => {
    const input = exercise.querySelector('input');
    const textarea = exercise.querySelector('textarea');

    // Chiavi uniche per questo progetto
    const weightKey = `wt_carico_${index}`;
    const noteKey = `wt_note_${index}`;

    // Ricarica dati salvati
    input.value = localStorage.getItem(weightKey) || '';
    textarea.value = localStorage.getItem(noteKey) || '';

    // Salvataggio dati
    input.addEventListener('input', () => {
      localStorage.setItem(weightKey, input.value);
    });
    textarea.addEventListener('input', () => {
      localStorage.setItem(noteKey, textarea.value);
      autoResize(textarea);
    });

    // Applica auto-resize iniziale
    autoResize(textarea);
  });
}
