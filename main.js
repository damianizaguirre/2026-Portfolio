// Portfolio main JavaScript file
document.addEventListener('DOMContentLoaded', () => {
  // Navigation button handling
  const navButtons = document.querySelectorAll('.nav-btn');
  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      navButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // Modal functionality
  const modalOverlay = document.getElementById('modal-overlay');
  const projectCards = document.querySelectorAll('.project-card');
  const modals = document.querySelectorAll('.modal');
  const fullscreenButtons = document.querySelectorAll('.modal-fullscreen');

  // Open modal when clicking project card
  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      const projectId = card.dataset.project;
      const modal = document.getElementById(`modal-${projectId}`);

      if (modal) {
        modalOverlay.classList.add('active');
        modal.classList.add('active');
        document.body.classList.add('modal-open');
      }
    });
  });

  // Close modal when clicking overlay (outside modal)
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeAllModals();
    }
  });

  // Close modal with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeAllModals();
    }
  });

  // Fullscreen toggle
  fullscreenButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const modal = btn.closest('.modal');
      modal.classList.toggle('fullscreen');
    });
  });

  function closeAllModals() {
    modalOverlay.classList.remove('active');
    modals.forEach(modal => {
      modal.classList.remove('active', 'fullscreen');
      // Reset scroll position
      const content = modal.querySelector('.modal-content');
      if (content) content.scrollTop = 0;
    });
    document.body.classList.remove('modal-open');
  }
});
