const trigger = document.getElementById('trigger-1');
const modal = document.getElementById('bio-modal-1');
const closeBtn = modal.querySelector('.close-modal');
let lastFocused;

function openModal() {
  lastFocused = document.activeElement;
  modal.classList.remove('hidden');
  modal.focus();
  trapFocus(modal);
}

function closeModal() {
  modal.classList.add('hidden');
  if (lastFocused) lastFocused.focus();
}

trigger.addEventListener('click', openModal);
trigger.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    openModal();
  }
});

closeBtn.addEventListener('click', closeModal);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
  }
});

function trapFocus(element) {
  const focusableElements = element.querySelectorAll('a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])');
  const firstEl = focusableElements[0];
  const lastEl = focusableElements[focusableElements.length - 1];

  element.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;

    if (e.shiftKey) {
      if (document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      }
    } else {
      if (document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    }
  });
}
