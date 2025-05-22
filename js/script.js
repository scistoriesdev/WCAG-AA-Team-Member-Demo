
const triggers = document.querySelectorAll('.team-trigger');
const modals = document.querySelectorAll('[role="dialog"]');
let lastFocused = null;

// Setup event listeners for each trigger
triggers.forEach(trigger => {
  const modalId = trigger.getAttribute('aria-controls');
  const modal = document.getElementById(modalId);
  const closeBtn = modal.querySelector('.close-modal');

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

  closeBtn.addEventListener('click', closeModal);

  // Escape key closes this modal
  modal.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  });

  // Add keyboard support for Enter/Space and Arrow Nav on triggers
  trigger.addEventListener('keydown', (e) => {
    const currentIndex = Array.from(triggers).indexOf(trigger);
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openModal();
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      const next = triggers[(currentIndex + 1) % triggers.length];
      next.focus();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = triggers[(currentIndex - 1 + triggers.length) % triggers.length];
      prev.focus();
    }
  });
});

// Focus trap inside modal
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
