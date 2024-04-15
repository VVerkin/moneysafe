import {convertStringNumber} from './convertStringNumber.js';
// Импортируем скроллбары
import {OverlayScrollbars} from './overlayscrollbars.esm.min.js';

// Получаем форму по классу
const financeForm = document.querySelector('.finance__form');
// Получим итоговое значение
const financeAmount = document.querySelector('.finance__amount');
// Получаем кнопку "отчет"
const financeReport = document.querySelector('.finance__report');
// Получаем отчет
const report = document.querySelector('.report');

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

// Ф-я закрывает отчет
// В параметрах получаем target деструктуризацией
const closeReport = ({target}) => {
    // окно закрывается при нажатии на крестик или вне окна.
    if (target.closest('.report__close') || (!target.closest('.report') && target !== financeReport)) {
    report.classList.remove('report__open');
    }
};

// Ф-я открывает отчет
const openReport = () => {
    report.classList.add('report__open');

document.addEventListener('click', closeReport);
};

// Навешиваем событие на клик по кнопке "отчет"
financeReport.addEventListener('click', openReport);


