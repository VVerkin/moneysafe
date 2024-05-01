
// Ф-я принимает строку из инпута формы
export const convertStringNumber = (str) => {
    // Убираем все пробелы (заменяем их на пустую строчку)
    const noSpaceStr = str.replace(/\s+/g, '');
    const num = parseFloat(noSpaceStr);
    // Проверка на то, что это число и оно конечно
    if (!isNaN(num) && isFinite(num)) {
        return num;
    } else {
        return false;
    }
};

// Ф-я меняет формат даты
export const reformatDate = (dateStr) => {
    // Разбиваем дату на несколько частей
    const [year, month, day] = dateStr.split('-');
    // Возвращаем дату в нужном формате (дд.мм.год)
    // padStart добавляет 0 если цифра однозначная
    return `${day.padStart(2, "0")}.${month.padStart(2, "0")}.${year}`
};

// Создание анимации
export const animationNumber = (element, number) => {
    // Кол-во кадров в секунду
    const fps = 60;
    // Длительность анимации 1с
    const duration = 2000;
    // Длительность 1 кадра
    const frameDuration = duration / fps;
    // Кол-во кадров
    const totalFrame = Math.round(duration / frameDuration);
    // Текущий кадр (currentFrame стремится к totalFrame)
    let currentFrame = 0;

    const initialNumber = parseInt(
        element.textContent.replace(/[^0-9.-]+/g, ''),
    );
    // Шаг анимации
    const increment = Math.trunc((number - initialNumber) / totalFrame);

    // Сама анимация
    const intervalId = setInterval(() => {
        // Увеличиваем число анимаций
        currentFrame += 1;

        // Увеличиваем кадр на значение инкремента
        const newNumber = initialNumber + increment * currentFrame;

        element.textContent = `${newNumber.toLocaleString()} ₽`;

        // Останавливаем интервал
        if (currentFrame === totalFrame) {
            clearInterval(intervalId);
            element.textContent = `${number.toLocaleString()} ₽`;
        }

    }, frameDuration);
};