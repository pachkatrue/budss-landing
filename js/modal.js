document.addEventListener('DOMContentLoaded', function() {
    initModals();
});

function initModals() {
    // Находим все модальные окна
    const modals = document.querySelectorAll('.modal');

    modals.forEach(modal => {
        // Закрытие по клику на оверлей
        const overlay = modal.querySelector('.modal__overlay');
        if (overlay) {
            overlay.addEventListener('click', function() {
                closeModal(modal.id);
            });
        }

        // Закрытие по клику на крестик
        const closeButton = modal.querySelector('.modal__close');
        if (closeButton) {
            closeButton.addEventListener('click', function() {
                closeModal(modal.id);
            });
        }

        // Закрытие по ESC
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && modal.classList.contains('show')) {
                closeModal(modal.id);
            }
        });
    });
}