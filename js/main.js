document.addEventListener('DOMContentLoaded', function() {
    // инициализация
    initMobileMenu();
    initScrollHeader();

    // события на кнопки
    const contactButtons = document.querySelectorAll('.button');
    contactButtons.forEach(button => {
        if (button.textContent.trim() === 'Contact sales') {
            button.addEventListener('click', function() {
                openModal('contactModal');
            });
        }
    });
});

// мобильное меню
function initMobileMenu() {
    const burgerMenu = document.querySelector('.burger-menu');

    if (burgerMenu) {
        burgerMenu.addEventListener('click', function() {
            this.classList.toggle('active');

            // мобильное меню
            let mobileMenu = document.querySelector('.mobile-menu');

            if (!mobileMenu) {
                mobileMenu = document.createElement('div');
                mobileMenu.className = 'mobile-menu';

                // мобильное меню
                const headerTabs = document.createElement('div');
                headerTabs.className = 'mobile-menu__header-tabs';

                const businessTab = document.createElement('a');
                businessTab.href = '#';
                businessTab.className = 'mobile-menu__header-tab mobile-menu__header-tab--business';
                businessTab.textContent = 'For Business';

                const customersTab = document.createElement('a');
                customersTab.href = '#';
                customersTab.className = 'mobile-menu__header-tab mobile-menu__header-tab--customers';
                customersTab.textContent = 'For Customers';

                headerTabs.appendChild(businessTab);
                headerTabs.appendChild(customersTab);

                // меню
                const menuContent = document.createElement('div');
                menuContent.className = 'mobile-menu__content';

                // добавляем логотип
                const logoWrapper = document.createElement('div');
                logoWrapper.className = 'mobile-menu__logo-wrapper';

                const logo = document.createElement('a');
                logo.href = '/';
                logo.className = 'mobile-menu__logo';

                const logoImg = document.createElement('img');
                logoImg.src = 'img/logo.svg';
                logoImg.alt = 'Budss Logo';
                logoImg.className = 'mobile-menu__logo-img';

                logoWrapper.appendChild(logo);

                // кнопка закрытия
                const closeButton = document.createElement('button');
                closeButton.className = 'mobile-menu__close';
                closeButton.setAttribute('aria-label', 'Закрыть меню');

                // навигация
                const navList = document.createElement('ul');
                navList.className = 'mobile-menu__nav';

                // пункты меню
                const menuItems = [
                    { text: 'For Business', href: '#' },
                    { text: 'For Customers', href: '#' },
                    { text: 'Privacy Policy', href: '#' },
                    { text: 'Terms Of Use - Seller', href: '#' },
                    { text: 'Terms of Use - Sellers & Customers', href: '#' }
                ];

                menuItems.forEach(item => {
                    const li = document.createElement('li');
                    li.className = 'mobile-menu__item';

                    const a = document.createElement('a');
                    a.href = item.href;
                    a.className = 'mobile-menu__link';
                    a.textContent = item.text;

                    li.appendChild(a);
                    navList.appendChild(li);
                });

                menuContent.appendChild(logoWrapper);
                menuContent.appendChild(closeButton);
                menuContent.appendChild(navList);

                mobileMenu.appendChild(headerTabs);
                mobileMenu.appendChild(menuContent);

                document.body.appendChild(mobileMenu);

                // Обработчик для кнопки закрытия
                closeButton.addEventListener('click', function() {
                    mobileMenu.classList.remove('active');
                    burgerMenu.classList.remove('active');
                    document.body.style.overflow = '';
                });
            }

            // Показываем/скрываем мобильное меню
            mobileMenu.classList.toggle('active');

            // Блокируем прокрутку страницы, когда открыто меню
            if (mobileMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Закрытие меню по клику на ссылку
        document.addEventListener('click', function(event) {
            const mobileMenu = document.querySelector('.mobile-menu');
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                if (event.target.closest('.mobile-menu__link')) {
                    mobileMenu.classList.remove('active');
                    burgerMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        });
    }
}

// Изменение стиля хэдера при скролинге
function initScrollHeader() {
    const header = document.querySelector('.header');

    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('header--scrolled');
            } else {
                header.classList.remove('header--scrolled');
            }
        });
    }
}

// открытие модалок
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';

        // Фокус
        const firstInput = modal.querySelector('input');
        if (firstInput) {
            setTimeout(() => {
                firstInput.focus();
            }, 300);
        }
    }
}

// закрытие модалок
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
}

const styleElement = document.createElement('style');
styleElement.textContent = `
    .mobile-menu {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 99;
        transform: translateX(-100%);
        transition: transform var(--transition-normal);
        display: flex;
        flex-direction: column;
    }
    
    .mobile-menu.active {
        transform: translateX(0);
    }
    
    .mobile-menu__header-tabs {
        display: flex;
        background-color: var(--color-secondary-2);
    }
    
    .mobile-menu__header-tab {
        padding: 10px 30px;
        color: var(--color-black);
        font-weight: 500;
    }
    
    .mobile-menu__header-tab--business {
        background-color: var(--color-black);
        color: var(--color-white);
        border-top-right-radius: 20px;
    }
    
    .mobile-menu__content {
        flex: 1;
        background-color: var(--color-black);
        padding: 20px;
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 30px;
    }
    
    .mobile-menu__logo-wrapper {
        display: flex;
        align-items: center;
    }
    
    .mobile-menu__logo-img {
        height: 32px;
        width: auto;
    }
    
    .mobile-menu__close {
        position: absolute;
        top: 20px;
        right: 20px;
        width: 24px;
        height: 24px;
        background: none;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .mobile-menu__close-icon {
        position: relative;
        width: 20px;
        height: 20px;
    }
    
    .mobile-menu__close-icon::before,
    .mobile-menu__close-icon::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 0;
        width: 100%;
        height: 2px;
        background-color: var(--color-white);
    }
    
    .mobile-menu__close-icon::before {
        transform: rotate(45deg);
    }
    
    .mobile-menu__close-icon::after {
        transform: rotate(-45deg);
    }
    
    .mobile-menu__nav {
        display: flex;
        flex-direction: column;
        gap: 25px;
    }
    
    .mobile-menu__link {
        font-size: 16px;
        color: var(--color-white);
        transition: color var(--transition-fast);
        display: block;
    }
    
    .mobile-menu__link:hover {
        color: var(--color-primary-0);
    }
    
    .header--scrolled {
        background-color: rgba(0, 0, 0, 0.9);
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    }
`;
document.head.appendChild(styleElement);