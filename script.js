// Gestione visibilità giorni con classi
function showDay(dayId) {
  const days = document.querySelectorAll('.day');
  days.forEach(d => d.classList.remove('active'));
  const target = document.getElementById(dayId);
  if (target) target.classList.add('active');
}

window.addEventListener('DOMContentLoaded', () => {
  // Assicurati che Push Day sia visibile all'avvio
  showDay('pushDay');

  // Inizializza esercizi con salvataggio e auto-resize
  document.querySelectorAll('.exercise').forEach((exercise, index) => {
    const input = exercise.querySelector('input');
    const textarea = exercise.querySelector('textarea');

    // Salvataggio dati
    input.addEventListener('input', () => {
      localStorage.setItem(`carico_${index}`, input.value);
    });
    textarea.addEventListener('input', () => {
      localStorage.setItem(`note_${index}`, textarea.value);
      autoResize(textarea);
    });

    // Ricarica dati salvati
    input.value = localStorage.getItem(`carico_${index}`) || "";
    textarea.value = localStorage.getItem(`note_${index}`) || "";

    // Applica auto-resize iniziale
    autoResize(textarea);
  });
});

// Funzione per auto-resize del textarea
function autoResize(textarea) {
  textarea.style.height = 'auto';               // reset altezza
  textarea.style.height = textarea.scrollHeight + 'px'; // nuova altezza in base al contenuto
}
