import { getData } from "./service.js";

const categoryList = document.querySelector('#categoryList');

const getCategories = (category) => {
    const option = document.createElement('option');
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