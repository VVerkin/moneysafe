
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
