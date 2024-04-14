import {convertStringNumber} from './convertStringNumber.js';

// Получаем форму по классу
const financeForm = document.querySelector('.finance__form');
// Получим итоговое значение
const financeAmount = document.querySelector('.finance__amount');
// Получаем кнопку "отчет"
const financeReport = document.querySelector('.finance__report');

let amount = 0;

financeAmount.taxtContent = amount;

//
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

financeReport.addEventListener('click', () => {
const report = document.querySelector('.report');
report.classList.add('report__open');
});