document.addEventListener('DOMContentLoaded', function() {
    initCookiesConsent();
});

function initCookiesConsent() {
    const cookiesConsent = document.getElementById('cookiesConsent');
    if (!cookiesConsent) return;

    const acceptButton = cookiesConsent.querySelector('.cookies__button--accept');
    const declineButton = cookiesConsent.querySelector('.cookies__button--decline');

    const cookieResponse = localStorage.getItem('cookiesAccepted');

    if (cookieResponse !== 'true') {
        setTimeout(() => {
            cookiesConsent.classList.add('show');
        }, 1000);
    }

    // Accept button click handler
    if (acceptButton) {
        acceptButton.addEventListener('click', function() {
            cookiesConsent.classList.remove('show');
            localStorage.setItem('cookiesAccepted', 'true');
        });
    }

    // Decline button click handler
    if (declineButton) {
        declineButton.addEventListener('click', function() {
            cookiesConsent.classList.remove('show');

            localStorage.setItem('cookiesAccepted', 'false');
        });
    }
}