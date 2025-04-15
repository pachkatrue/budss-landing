document.addEventListener('DOMContentLoaded', function() {
    initPhoneMask();
});

function initPhoneMask() {
    const phoneInput = document.getElementById('phone');

    if (phoneInput) {
        // Устанавливаем значение по умолчанию
        if (!phoneInput.value) {
            phoneInput.value = '+7';
        }

        // Обработчик события ввода
        phoneInput.addEventListener('input', function(e) {
            const value = e.target.value;

            // Проверяем наличие +7 в начале
            if (!value.startsWith('+7')) {
                phoneInput.value = '+7' + value.replace(/^\+7/, '');
            }

            // Форматируем номер
            formatPhoneNumber(phoneInput);
        });

        // Предотвращаем удаление +7
        phoneInput.addEventListener('keydown', function(e) {
            const value = e.target.value;

            // Если пытаются удалить +7
            if ((e.key === 'Backspace' || e.key === 'Delete') &&
                (value === '+7' || value === '+')) {
                e.preventDefault();
            }
        });

        // Фокус на поле - ставим курсор в конец
        phoneInput.addEventListener('focus', function() {
            // Если в поле только +7, ставим курсор в конец
            setTimeout(() => {
                const value = phoneInput.value;
                if (value === '+7') {
                    phoneInput.setSelectionRange(value.length, value.length);
                }
            }, 0);
        });
    }
}

// Форматирование номера телефона в маску +7 (XXX) XXX-XX-XX
function formatPhoneNumber(input) {
    let value = input.value.replace(/\D/g, '');

    // Всегда должно начинаться с 7
    if (value.length > 0 && value[0] !== '7') {
        value = '7' + value;
    }

    // Ограничиваем длину до 11 цифр (включая 7)
    if (value.length > 11) {
        value = value.slice(0, 11);
    }

    let formattedValue = '';

    if (value.length > 0) {
        formattedValue = '+' + value[0];
    }

    if (value.length > 1) {
        formattedValue += ' (' + value.substring(1, 4);
    }

    if (value.length > 4) {
        formattedValue += ') ' + value.substring(4, 7);
    }

    if (value.length > 7) {
        formattedValue += '-' + value.substring(7, 9);
    }

    if (value.length > 9) {
        formattedValue += '-' + value.substring(9, 11);
    }

    input.value = formattedValue;
}