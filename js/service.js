// Размещено все, что делает запросы на сервер

const API_URL = 'https://deluxe-meadow-trumpet.glitch.me/api'

export const getData = async (url) => {
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

export const postData = async (url, data) => {
    // Пишем конструкцию try-catch для защиты от ошибок
    try {
        // Получаем данные, вторым параметром передаем настройки
        const response = await fetch(`${API_URL}${url}`, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify(data),
        })
        // Проверка на то, что данные не ок
        if (!response.ok) {
            // Создаем ошибку
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        // Если все ок
        return await response.json();
    } catch (error) {
        console.error('Ошибка при отправке данных', error);
        throw error;
    }
}

