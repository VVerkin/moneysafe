
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
