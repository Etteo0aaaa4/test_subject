document.addEventListener('DOMContentLoaded', () => {
    const submitButton = document.getElementById('sub-but');
    const inputField = document.getElementById('enter-but');
    const outputDiv = document.getElementById('output');
    const tableRow = document.querySelector('#output table tr:last-child');

    submitButton.addEventListener('click', async () => {
        const id = inputField.value.trim();
        if (!id) return;  // Если поле пустое, ничего не делаем

        try {
            // 1. Показываем таблицу
            outputDiv.style.display = 'block';

            // 2. Отправляем запрос к Google Apps Script
            const scriptUrl = 'https://script.google.com/macros/s/AKfycbxzW6J7yWhKzpVZogxT0aaioDA5R_20XZZFP6av5F_WcRepc3bZkDU-bvHXwwmDnK94Ow/exec';  // Замени на свой URL!
            const response = await fetch(`${scriptUrl}?id=${id}`);
            const data = await response.json();

            // 3. Заполняем таблицу данными
            if (data.error) {
                tableRow.innerHTML = `<td colspan="3">${data.error}</td>`;
            } else {
                tableRow.innerHTML = `
                    <td>${data.id}</td>
                    <td>${data.name}</td>
                    <td>${data.status}</td>
                `;
            }
        } catch (error) {
            tableRow.innerHTML = `<td colspan="3">Ошибка подключения</td>`;
            console.error('Ошибка:', error);
        }
    });
    });