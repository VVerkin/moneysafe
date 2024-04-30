import {convertStringNumber} from './helpers.js'; 
import { getData, postData } from './service.js';

// Получаем форму по классу
const financeForm = document.querySelector('.finance__form');
// Получим итоговое значение
const financeAmount = document.querySelector('.finance__amount');
// Формируем amount
let amount = 0;

financeAmount.taxtContent = amount;

const addNewOperation = async (e) => {
        e.preventDefault();
        // Определяем тип операции (нажатие на "-" - expenses, на "+" - income)
        const typeOperation = e.submitter.dataset.typeOperation;
        // Формируем объект из введенных в поля данных, который будем отправлять на сервер
        const financeFormDate = Object.fromEntries(new FormData(financeForm));
        // Добавляем в сформированный объект поле type
        financeFormDate.type = typeOperation;
        
        const newOperation = await postData("/finance", financeFormDate);

        // Получаем данные из поля "сумма" и проверяем на число ф-й convertStringNumber
        // Приводим число к натуральному с помощью Math.abs
        const changeAmount = Math.abs(convertStringNumber(newOperation.amount));

        if (typeOperation === 'income') {
            amount += changeAmount;
        }

        if (typeOperation === 'expenses') {
            amount -= changeAmount;
        }
        // Результат выводим с разделением тысяч и добавлением знака рубля
        financeAmount.textContent = `${amount.toLocaleString()} ₽`;
        financeForm.reset();
    };

export const financeControl = async () => {
    // Получаем данные делая запрос на все финансова=ые операции
    const operations = await getData('/finance');

    amount = operations.reduce((acc, item) => {
        if (item.type === 'income') {
            acc += convertStringNumber(item.amount);
        }
        if (item.type === 'expenses') {
            acc -= convertStringNumber(item.amount);
        }

        return acc;
    }, 0);

    financeAmount.textContent = `${amount.toLocaleString()} ₽`;
// Ф-я выполняет добавление или уменьшение суммы при нажатии на "+" или "-"
    financeForm.addEventListener('submit', addNewOperation);
}