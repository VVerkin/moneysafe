import {convertStringNumber} from './helpers.js'; 

// Получаем форму по классу
const financeForm = document.querySelector('.finance__form');
// Получим итоговое значение
const financeAmount = document.querySelector('.finance__amount');

let amount = 0;

financeAmount.taxtContent = amount;

export const financeControl = () => {
// Ф-я выполняет добавление или уменьшение суммы при нажатии на "+" или "-"
    financeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Определяем тип операции (нажатие на "-" - expenses, на "+" - income)
        const typeOperation = e.submitter.dataset.typeOperation;
        // Формируем объект из введенных в поля данных, который будем отправлять на сервер
        const financeFormDate = Object.fromEntries(new FormData(financeForm));
        // Добавляем в сформированный объект поле type
        financeFormDate.type = typeOperation;
        console.log('financeFormDate: ', financeFormDate);

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
}