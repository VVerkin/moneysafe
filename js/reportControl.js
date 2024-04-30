// Импортируем скроллбары
import { reformatDate } from './helpers.js';
import { OverlayScrollbars } from './overlayscrollbars.esm.min.js';
import { getData } from './service.js';


// Получаем тип операции в виде объекта
const typesOperation = {
    income: 'Доход',
    expenses: 'Расход'
};

// Получаем кнопку "отчет"
const financeReport = document.querySelector('.finance__report');
// Получаем отчет
const report = document.querySelector('.report');
// Получаем tbody по классу
const reportOperationList = document.querySelector('.report__operation-list');
// Получаем форму с началом и концом даты
const reportDates = document.querySelector('.report__dates');

// Активируем скроллбары
OverlayScrollbars(report, {});
// Ф-я асинхронная, т.к. делает запросы к серверу


// Ф-я закрывает отчет
// В параметрах получаем target деструктуризацией
const closeReport = ({target}) => {
    // окно закрывается при нажатии на крестик или вне окна.
    if (target.closest('.report__close') || (!target.closest('.report') && target !== financeReport)) {
    // Делаем анимацию закрытия отчета через gsap
    gsap.to(report, {
        opacity: 0,
        scale: 0,
        duration: 0.5,
        ease: "power2.in",
        onComplete() {
            report.style.visibility = 'hidden';
        }
    });

    // report.classList.remove('report__open');
    // Убираем событие с документа, что бы оно не висело и не остлеживало клики
    document.removeEventListener('click', closeReport);
    }
};

// Ф-я открывает отчет
const openReport = () => {
    // Берем элемент "отчет" и меняем у него стили
    report.style.visibility = 'visible';
    // Делаем анимацию открытия отчета через gsap
    gsap.to(report, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: "power2.out",
    });


    // report.classList.add('report__open');
// Навешиваем событие на документ, которое закроет окно при клике на крестик или вмне отчета
document.addEventListener('click', closeReport);
};


// Ф-я отрисовывает таблицу на основе данных
const renderReport = (data) => {
    // Очищаем табличку
    reportOperationList.textContent = '';

    // Формируем таблицу (перебираем операции и строим строки в таблице)
    // data.map принимает деструктурированный объект operation
    const reportRows = data.map(({category, amount, description, date, type, id}) => {
        const reportRow = document.createElement('tr');
        reportRow.classList.add('report__row');

        reportRow.innerHTML = `
        <td class="report__cell">${category}</td>
        <td class="report__cell" style="text-align: right">${amount.toLocaleString()}&nbsp;₽</td>
        <td class="report__cell">${description}</td>
        <td class="report__cell">${reformatDate(date)}</td>
        <td class="report__cell">${typesOperation[type]}</td>
        <td class="report__action-cell">
            <button
            class="report__button report__button_table" data-id=${id}>&#10006;</button>
        </td>
        `;

        return reportRow;
    });
    // Передаем их без фигурных скобок (просто через запятую) с помощью спред оператора
    reportOperationList.append(...reportRows);
};


export const reportControl  = () => {
    // Навешиваем слушатель события для делегирования при нажатии на крестики
    reportOperationList.addEventListener('click', ({target}) => {
        console.log(target.dataset.id); // дз
    })

    // Навешиваем событие на клик по кнопке "отчет"
    financeReport.addEventListener('click', async () => {
        const textContent = financeReport.textContent;
        // На время загрузки вставляем прелоадер
        financeReport.textContent = 'Загрузка';
        financeReport.disabled = true;
        // Ф-я делает запрос к серверу
        // getData - асинхронная ф-я, поэтому нужно дождаться данных (пишем await)
        const data = await getData('/finance');
        financeReport.textContent = textContent;
        financeReport.disabled = false;
        // После получения данных с сервера вызовем ф-ю 
        renderReport(data);
        // Сначала получили все данные, затем открываем отчет
        openReport();
    });
    // Навешиваем слушатель события на форму с периодом даты
    reportDates.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = Object.fromEntries(new FormData(reportDates));

        const searchParams = new URLSearchParams();

        if (formData.startDate) {
            searchParams.append('startDate', formData.startDate);
        }

        if (formData.endDate) {
            searchParams.append('endDate', formData.endDate);
        }

        const queryString = searchParams.toString();

        const url = queryString ? `/finance?${queryString}` : '/finance'

        const data = await getData(url);
        renderReport(data);
    });
}


