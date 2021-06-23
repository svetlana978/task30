function useRequest(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);

    xhr.onload = function() {
        if (xhr.status != 200) {
            console.log('Статус ответа: ', xhr.status);
        } else {
            const result = JSON.parse(xhr.response);
            if (callback) {
                callback(result);
            }
        }
    };

    xhr.onerror = function() {
        console.log('Ошибка! Статус ответа: ', xhr.status);
    };

    xhr.send();
};

// Ищем ноду для вставки результата запроса
const resultNode = document.querySelector('.j-result');
// Ищем кнопку, по нажатии на которую будет запрос
const btnNode = document.querySelector('.j-btn-request');
const year = document.querySelector('.year');


function displayResult(apiData) {
    let cards = '';
    // console.log('start cards', cards);
    // const year = apiData.year;

    const yearID = year.selectedIndex;
    //  console.log (apiData[yearID]);
    if (yearID == 0) alert("Выберите, пожалуйста, год");
    else {
        const cardBlock = `
        <div class="report">
        <table frame="border">
        <caption>Отчет</caption>
        <tr>
            <th>1 кв.</th>
            <th>2 кв.</th>
            <th>3 кв.</th>
            <th>4 кв.</th>
        </tr>
        <tr>
            <td>${apiData[yearID-1].sales.q1}</td>
            <td>${apiData[yearID-1].sales.q2}</td>
            <td>${apiData[yearID-1].sales.q3}</td>
            <td>${apiData[yearID-1].sales.q4}</td>
        </tr>
        </table>
        </div>
        `;

        resultNode.innerHTML = cardBlock;
    }
}

// Вешаем обработчик на кнопку для запроса
btnNode.addEventListener('click', () => {
    useRequest('https://my.api.mockaroo.com/revenue_2017-2019.json?key=fd36b440', displayResult);
})