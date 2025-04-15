document.addEventListener('DOMContentLoaded', function() {
    initFormValidation();
});

function initFormValidation() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            // Валидируем форму
            const isValid = validateForm(contactForm);

            if (isValid) {
                // Здесь будет отправка формы, имитируем загрузку
                const submitButton = contactForm.querySelector('.form__submit');
                submitButton.classList.add('button--loading');
                submitButton.disabled = true;

                // Имитация отправки
                setTimeout(() => {
                    submitButton.classList.remove('button--loading');
                    submitButton.disabled = false;

                    // Очищаем форму
                    contactForm.reset();

                    // Закрываем модальное окно
                    closeModal('contactModal');

                    // Показываем сообщение об успешной отправке
                    alert('Сообщение успешно отправлено!');
                }, 1500);
            }
        });

        // Валидация поля при потере фокуса
        const requiredInputs = contactForm.querySelectorAll('[required]');
        requiredInputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateInput(input);
            });
        });
    }
}

// Валидация всей формы
function validateForm(form) {
    const requiredInputs = form.querySelectorAll('[required]');
    let isValid = true;

    requiredInputs.forEach(input => {
        if (!validateInput(input)) {
            isValid = false;
        }
    });

    return isValid;
}

// Валидация отдельного поля
function validateInput(input) {
    const type = input.type;
    let errorElement = document.getElementById(`${input.id}Error`);
    let isValid = true;
    let errorMessage = '';

    // Если элемент ошибки не найден, создаем его
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'form__error';
        errorElement.id = `${input.id}Error`;
        input.parentNode.appendChild(errorElement);
    }

    // Проверка на пустоту
    if (!input.value.trim()) {
        isValid = false;
        errorMessage = 'This field is required.';
    }
    // Дополнительные проверки в зависимости от типа поля
    else if (type === 'email' && !validateEmail(input.value)) {
        isValid = false;
        errorMessage = 'Invalid email.';
    }
    else if (input.id === 'phone' && !validatePhone(input.value)) {
        isValid = false;
        errorMessage = 'Invalid phone number.';
    }

    // Визуальное отображение результата валидации
    if (!isValid) {
        input.classList.add('form__input--error');
        errorElement.textContent = errorMessage;
    } else {
        input.classList.remove('form__input--error');
        errorElement.textContent = '';
    }

    return isValid;
}

// Проверка email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Проверка телефона (для российских номеров)
function validatePhone(phone) {
    // Оставляем только цифры
    const phoneDigits = phone.replace(/\D/g, '');

    // Проверяем формат номера (+7 и 10 цифр после)
    return phoneDigits.startsWith('7') && phoneDigits.length === 11;
}