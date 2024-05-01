import { getData } from "./service.js";

const categoryList = document.querySelector('#categoryList');

const getCategories = (category) => {
    // Создаем новый элемент option (как в верстке)
    const option = document.createElement('option');
    // Добавляем ему значение
    option.value = category;
    return option
};
// Ф-я добавляет категорию в список
export const datalistControl = async () => {
    categoryList.textContent = '';

    // Вызываем ф-ю запроса на сервер
    const categories = await getData('/categories');
    // Пребираем полученные категории
    const optionsIncome = categories.income.map(getCategories);
    const optionsExpenses = categories.expenses.map(getCategories);

    categoryList.append(...optionsExpenses, ...optionsIncome);
};