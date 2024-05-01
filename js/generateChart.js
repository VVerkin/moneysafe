const reportChart = document.querySelector('.report__chart');

export const  clearChart = () => {
    reportChart.textContent = '';
};
// Создаем два массива по которым будем рисовать графики расходов и доходов
export const generateChart = (data) => {
    const incomeData = data.filter(item => item.type === "income");
    const expensesData = data.filter(item => item.type === "expenses");

    const chartLabel = new Set(data.map(item => item.date));

    let accIncome = 0;
    let accExpenses = 0;

    chartLabel.map(date => {
        const total = incomeData.filter(item => item.date === date).reduce((acc, record) => {
            
        })
    })

}