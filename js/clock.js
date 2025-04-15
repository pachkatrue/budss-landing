document.addEventListener('DOMContentLoaded', function() {
    initClock();
});

function initClock() {
    const hourHand = document.querySelector('.clock__hour-hand');
    const minuteHand = document.querySelector('.clock__minute-hand');
    const secondHand = document.querySelector('.clock__second-hand');
    const startButton = document.querySelector('.clock-controls__button--start');
    const pauseButton = document.querySelector('.clock-controls__button--pause');

    if (!hourHand || !minuteHand || !secondHand) return;

    let clockInterval;
    let isPaused = true;

    // Функция для обновления позиции стрелок
    function updateClock() {
        const now = new Date();
        const hours = now.getHours() % 12;
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();

        // Расчет углов для стрелок
        const hourDegrees = (hours * 30) + (minutes * 0.5); // 30 градусов на час, 0.5 градуса за минуту
        const minuteDegrees = (minutes * 6) + (seconds * 0.1); // 6 градусов на минуту, 0.1 градуса за секунду
        const secondDegrees = seconds * 6; // 6 градусов на секунду

        // Применение вращения к стрелкам
        hourHand.style.transform = `translateX(-50%) rotate(${hourDegrees}deg)`;
        minuteHand.style.transform = `translateX(-50%) rotate(${minuteDegrees}deg)`;
        secondHand.style.transform = `translateX(-50%) rotate(${secondDegrees}deg)`;
    }

    // Функция запуска часов
    function startClock() {
        if (isPaused) {
            // Устанавливаем начальную позицию стрелок
            updateClock();

            // Запускаем интервал для обновления каждую секунду
            clockInterval = setInterval(updateClock, 1000);

            isPaused = false;

            // Обновляем состояние кнопок
            startButton.disabled = true;
            pauseButton.disabled = false;
        }
    }

    // Функция остановки часов
    function pauseClock() {
        if (!isPaused) {
            clearInterval(clockInterval);
            isPaused = true;

            // Обновляем состояние кнопок
            startButton.disabled = false;
            pauseButton.disabled = true;
        }
    }

    // Привязываем обработчики событий к кнопкам
    startButton.addEventListener('click', startClock);
    pauseButton.addEventListener('click', pauseClock);

    // Изначально кнопка паузы неактивна
    pauseButton.disabled = true;
}