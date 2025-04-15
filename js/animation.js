document.addEventListener('DOMContentLoaded', function() {
    initHowBudssWorksAnimation();
});

function initHowBudssWorksAnimation() {
    const animationContainer = document.querySelector('.how-it-works__content');

    if (animationContainer) {
        // очистка
        const oldAnimation = document.querySelector('.how-it-works__animation');
        if (oldAnimation) {
            oldAnimation.innerHTML = '';
        }

        // SVG-маска для эффекта изменения цвета
        createColorMasks();

        // Создаем строки текста
        const rows = [
            { direction: 'left-to-right', colorBefore: '#2FDBBC', colorAfter: '#1AA896' },
            { direction: 'right-to-left', colorBefore: '#BA8BF3', colorAfter: '#9C5CD9' },
            { direction: 'left-to-right', colorBefore: '#FFA44C', colorAfter: '#E86B18' }
        ];

        // Создаем анимационный контейнер
        let animationWrapper = document.querySelector('.how-it-works__animation');
        if (!animationWrapper) {
            animationWrapper = document.createElement('div');
            animationWrapper.className = 'how-it-works__animation';
            animationContainer.prepend(animationWrapper);
        }

        // Добавляем строки в анимацию
        rows.forEach((row, index) => {
            const marqueeRow = createMarqueeRow(row.direction, row.colorBefore, row.colorAfter, index);
            animationWrapper.appendChild(marqueeRow);
        });

        // Позиционируем телефон в центр
        positionPhone();
    }
}

function createColorMasks() {
    // Создаем SVG-элемент для маски цвета
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", "0");
    svg.setAttribute("height", "0");
    svg.style.position = "absolute";

    // Создаем маску для левой части (до телефона)
    const maskBefore = document.createElementNS(svgNS, "mask");
    maskBefore.setAttribute("id", "mask-before");

    const rectBefore = document.createElementNS(svgNS, "rect");
    rectBefore.setAttribute("width", "100%");
    rectBefore.setAttribute("height", "100%");
    rectBefore.setAttribute("fill", "white");

    const rectPhone = document.createElementNS(svgNS, "rect");
    rectPhone.setAttribute("x", "40%");
    rectPhone.setAttribute("width", "60%");
    rectPhone.setAttribute("height", "100%");
    rectPhone.setAttribute("fill", "black");

    maskBefore.appendChild(rectBefore);
    maskBefore.appendChild(rectPhone);

    // Создаем маску для правой части (после телефона)
    const maskAfter = document.createElementNS(svgNS, "mask");
    maskAfter.setAttribute("id", "mask-after");

    const rectAfter = document.createElementNS(svgNS, "rect");
    rectAfter.setAttribute("width", "100%");
    rectAfter.setAttribute("height", "100%");
    rectAfter.setAttribute("fill", "white");

    const rectPhoneAfter = document.createElementNS(svgNS, "rect");
    rectPhoneAfter.setAttribute("width", "40%");
    rectPhoneAfter.setAttribute("height", "100%");
    rectPhoneAfter.setAttribute("fill", "black");

    maskAfter.appendChild(rectAfter);
    maskAfter.appendChild(rectPhoneAfter);

    // Добавляем маски в SVG
    svg.appendChild(maskBefore);
    svg.appendChild(maskAfter);

    // Добавляем SVG в доку
    document.body.appendChild(svg);
}

function positionPhone() {
    // Находим или создаем элемент телефона
    let phoneElement = document.querySelector('.how-it-works__phone');
    if (!phoneElement || phoneElement.style.display === 'none') {
        const container = document.querySelector('.how-it-works__content');
        if (!container) return;

        phoneElement = document.createElement('div');
        phoneElement.className = 'how-it-works__phone';

        const phoneImage = document.createElement('img');
        phoneImage.src = 'img/iphone.png';
        phoneImage.alt = 'Budss app on iPhone';
        phoneImage.className = 'how-it-works__phone-image';

        phoneElement.appendChild(phoneImage);
        container.appendChild(phoneElement);
    }

    // Устанавливаем позицию телефона
    phoneElement.style.position = 'absolute';
    phoneElement.style.top = '50%';
    phoneElement.style.left = '50%';
    phoneElement.style.transform = 'translate(-50%, -50%)';
    phoneElement.style.zIndex = '5';
    phoneElement.style.display = 'block';
}

function createMarqueeRow(direction, colorBefore, colorAfter, rowIndex) {
    // Создаем строку с двойным текстом (до и после прохождения телефона)
    const marqueeRow = document.createElement('div');
    marqueeRow.className = 'marquee';
    marqueeRow.dataset.direction = direction;

    // Создаем контейнер для текста до телефона
    const beforeText = document.createElement('div');
    beforeText.className = 'marquee__text marquee__text--before';

    // Создаем контейнер для текста после телефона
    const afterText = document.createElement('div');
    afterText.className = 'marquee__text marquee__text--after';

    // Устанавливаем цвета в зависимости от направления
    if (direction === 'left-to-right') {
        // Для движения слева направо: слева цветной, справа с обводкой
        beforeText.style.color = colorBefore;
        afterText.style.color = 'transparent';
        afterText.style.webkitTextStroke = '1px #444444';
        afterText.style.textStroke = '1px #444444';
    } else {
        // Для движения справа налево: справа цветной, слева с обводкой
        beforeText.style.color = 'transparent';
        beforeText.style.webkitTextStroke = '1px #444444';
        beforeText.style.textStroke = '1px #444444';
        afterText.style.color = colorAfter;
    }

    // Создаем трек для бегущего текста
    const trackElement = document.createElement('div');
    trackElement.className = 'marquee__track';

    // Добавляем множество элементов для непрерывной анимации
    for (let i = 0; i < 15; i++) {
        const textItem = document.createElement('span');
        textItem.className = 'marquee__item';
        textItem.textContent = 'How Budss Works';
        trackElement.appendChild(textItem);
    }

    // Клонируем трек для обоих контейнеров
    const beforeTrack = trackElement.cloneNode(true);
    const afterTrack = trackElement.cloneNode(true);

    beforeText.appendChild(beforeTrack);
    afterText.appendChild(afterTrack);

    marqueeRow.appendChild(beforeText);
    marqueeRow.appendChild(afterText);

    // Настраиваем анимацию для обоих треков
    setupTrackAnimation(beforeTrack, afterTrack, direction, rowIndex);

    return marqueeRow;
}

function setupTrackAnimation(beforeTrack, afterTrack, direction, rowIndex) {
    // Создаем уникальный ID для анимации
    const animId = 'marquee-' + rowIndex + '-' + Math.floor(Math.random() * 10000);

    // Определяем параметры анимации в зависимости от направления
    const startPosition = direction === 'left-to-right' ? '-100%' : '0%';
    const endPosition = direction === 'left-to-right' ? '0%' : '-100%';

    // Скорость анимации (разная для разных строк)
    const baseDuration = direction === 'left-to-right' ? 80 : 70;
    const duration = baseDuration + (rowIndex * 10);

    // Создаем стили анимации
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        @keyframes track${animId} {
            from { transform: translateX(${startPosition}); }
            to { transform: translateX(${endPosition}); }
        }
        
        .marquee[data-direction="${direction}"] .marquee__track.active-${animId} {
            animation: track${animId} ${duration}s linear infinite;
        }
    `;
    document.head.appendChild(styleElement);

    // Активируем анимацию для обоих треков
    beforeTrack.classList.add(`active-${animId}`);
    afterTrack.classList.add(`active-${animId}`);

    // Синхронизируем анимацию обоих треков
    afterTrack.style.animationDelay = '0s';
    beforeTrack.style.animationDelay = '0s';

    // Пауза при наведении
    const parentRow = beforeTrack.closest('.marquee');
    if (parentRow) {
        parentRow.addEventListener('mouseenter', function() {
            beforeTrack.style.animationPlayState = 'paused';
            afterTrack.style.animationPlayState = 'paused';
        });

        parentRow.addEventListener('mouseleave', function() {
            beforeTrack.style.animationPlayState = 'running';
            afterTrack.style.animationPlayState = 'running';
        });
    }
}