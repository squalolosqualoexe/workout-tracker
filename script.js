// Mostra solo il giorno selezionato
function showDay(dayId) {
  const days = document.querySelectorAll('.day');
  days.forEach(d => d.classList.remove('active'));
  const target = document.getElementById(dayId);
  if (target) target.classList.add('active');
}

// Auto-resize delle note
function autoResize(textarea) {
  textarea.style.height = 'auto';
  textarea.style.height = textarea.scrollHeight + 'px';
}

window.addEventListener('DOMContentLoaded', () => {
  // Mostra Upper 1 all'avvio
  showDay('upper1');

  // Inizializza esercizi con salvataggio e auto-resize
  document.querySelectorAll('.exercise').forEach((exercise, index) => {
    const input = exercise.querySelector('input');
    const textarea = exercise.querySelector('textarea');

    // Ricarica dati salvati
    input.value = localStorage.getItem(`carico_${index}`) || "";
    textarea.value = localStorage.getItem(`note_${index}`) || "";

    // Salvataggio dati
    input.addEventListener('input', () => {
      localStorage.setItem(`carico_${index}`, input.value);
    });
    textarea.addEventListener('input', () => {
      localStorage.setItem(`note_${index}`, textarea.value);
      autoResize(textarea);
    });

    // Applica auto-resize iniziale
    autoResize(textarea);
  });
});

