
const triggers = document.querySelectorAll('.team-trigger');
let lastFocused = null;

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
  trigger.addEventListener('mouseenter', openModal);
  trigger.addEventListener('keydown', (e) => {
    const allTriggers = Array.from(document.querySelectorAll('.team-trigger'));
    const currentIndex = allTriggers.indexOf(trigger);

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openModal();
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      const next = allTriggers[(currentIndex + 1) % allTriggers.length];
      next.focus();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = allTriggers[(currentIndex - 1 + allTriggers.length) % allTriggers.length];
      prev.focus();
    }
  });

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  modal.addEventListener('mouseenter', () => clearTimeout(modal._hoverTimeout));
  modal.addEventListener('mouseleave', () => modal._hoverTimeout = setTimeout(() => closeModal(), 300));
  trigger.addEventListener('mouseleave', () => modal._hoverTimeout = setTimeout(() => closeModal(), 300));
});

// Focus trap
function trapFocus(element) {
  const focusableElements = element.querySelectorAll('a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])');
  const firstEl = focusableElements[0];
  const lastEl = focusableElements[focusableElements.length - 1];

  element.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;

    if (e.shiftKey && document.activeElement === firstEl) {
      e.preventDefault();
      lastEl.focus();
    } else if (!e.shiftKey && document.activeElement === lastEl) {
      e.preventDefault();
      firstEl.focus();
    }
  });
}

// Tab Switching
const tabs = document.querySelectorAll('[role="tab"]');
const panels = document.querySelectorAll('[role="tabpanel"]');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.setAttribute('aria-selected', 'false'));
    tab.setAttribute('aria-selected', 'true');

    panels.forEach(p => p.classList.add('hidden'));
    const targetPanel = document.getElementById(tab.getAttribute('aria-controls'));
    targetPanel.classList.remove('hidden');
  });
});
