import {convertStringNumber} from './convertStringNumber.js';
// Импортируем скроллбары
import {OverlayScrollbars} from './overlayscrollbars.esm.min.js';

const API_URL = 'https://deluxe-meadow-trumpet.glitch.me/api'

// Получаем форму по классу
const financeForm = document.querySelector('.finance__form');
// Получим итоговое значение
const financeAmount = document.querySelector('.finance__amount');
// Получаем кнопку "отчет"
const financeReport = document.querySelector('.finance__report');
// Получаем отчет
const report = document.querySelector('.report');
// Получаем tbody по классу
const reportOperationList = document.querySelector('.report__operation-list');

let amount = 0;

financeAmount.taxtContent = amount;

// Ф-я выполняет добавление или уменьшение суммы при нажатии на "+" или "-"
financeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Определяем тип операции (нажатие на "-" - expenses, на "+" - income)
    const typeOperation = e.submitter.dataset.typeOperation;
    // Получаем данные из поля "сумма" и проверяем на число ф-й convertStringNumber
    // Приводим число к натуральному с помощью Math.abs
    const changeAmount = Math.abs(convertStringNumber(financeForm.amount.value));

    if (typeOperation === 'income') {
        amount += changeAmount;
    }

    if (typeOperation === 'expenses') {
        amount -= changeAmount;
    }
    // Результат выводим с разделением тысяч и добавлением знака рубля
    financeAmount.textContent = `${amount.toLocaleString()} ₽`;
});

// Активируем скроллбары
OverlayScrollbars(report, {});
// Ф-я асинхронная, т.к. делает запросы к серверу
const getData = async (url) => {
    // Пишем конструкцию try-catch для защиты от ошибок
    try {
        // Получаем данные
        const response = await fetch(`${API_URL}${url}`)
        // Проверка на то, что данные не ок
        if (!response.ok) {
            // Создаем ошибку
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        // Если все ок
        return await response.json();
    } catch (error) {
        console.error('Ошибка при получении данных', error);
        throw error;
    }
}

// Ф-я закрывает отчет
// В параметрах получаем target деструктуризацией
const closeReport = ({target}) => {
    // окно закрывается при нажатии на крестик или вне окна.
    if (target.closest('.report__close') || (!target.closest('.report') && target !== financeReport)) {
    report.classList.remove('report__open');
    // Убираем событие с документа, что бы оно не висело и не остлеживало клики
    document.removeEventListener('click', closeReport);
    }
};

// Ф-я открывает отчет
const openReport = () => {
    report.classList.add('report__open');
// Навешиваем событие на документ, которое закроет окно при клике на крестик или вмне отчета
document.addEventListener('click', closeReport);
};
// Ф-я меняет формат даты
const reformatDate = (dateStr) => {
    const [year, month, day] = dateStr.split('-');
    return `${day.padStart(2, "0")}.${month.padStart(2, "0")}.${year}`
};

// Ф-я отрисовывает таблицу на основе данных
const renderReport = (data) => {
    reportOperationList.textContent = '';

    // Формируем таблицу (перебираем операции и строим строки в таблице)
    const reportRows = data.map(({category, amount, description, date, type}) => {
        const reportRow = document.createElement('tr');
        reportRow.classList.add('report__row');

        reportRow.innerHTML = `
        <td class="report__cell">${category}</td>
        <td class="report__cell">${amount.toLocaleString()} ₽</td>
        <td class="report__cell">${description}</td>
        <td class="report__cell">${reformatDate(date)}</td>
        <td class="report__cell">${type}</td>
        <td class="report__action-cell">
            <button
            class="report__button report__button_table">&#10006;</button>
        </td>
        `;

        return reportRow;
    });
    // Передаем их без фигурных скобок (просто через запятую) с помощью спред оператора
    reportOperationList.append(...reportRows);
};

// Навешиваем событие на клик по кнопке "отчет"
financeReport.addEventListener('click', async () => {
    openReport();
    // Ф-я делает запрос к серверу
    // getData - асинхронная ф-я, поэтому нужно дождаться данных (пишем await)
    const data = await getData('/test');
    console.log('data: ', data);
    // После получения данных с сервера вызовем ф-ю 
    renderReport(data);
});
