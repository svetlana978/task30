const btn = document.querySelector('.j-btn');
const btnClearNode = document.querySelector('.j-btn-clear');
const resultNode = document.querySelector('.j-result');
const pageNum = document.querySelector('#page_number');
const limit = document.querySelector('#limit');


btn.addEventListener('click', () => {
    // Делаем запрос за данными
    // console.log(pageNum.value);
    resultNode.innerHTML = "";
    let i = 0;
    if (pageNum.value < 1 || pageNum.value > 10) {
        i += 1;
        resultNode.innerHTML = "Номер страницы вне диапазона от 1 до 10";
    }
    if (limit.value < 1 || limit.value > 10) {
        i += 1;
        resultNode.innerHTML = "Лимит вне диапазона от 1 до 10";
        //console.log(limit.value);
    }
    if (i == 2) resultNode.innerHTML = "Номер страницы и лимит вне диапазона от 1 до 10";

    if (!resultNode.innerHTML) {
        localStorage.setItem('pageNum', pageNum.value);
        localStorage.setItem('limit', limit.value);
        let url = 'https://picsum.photos/v2/list?page=' + pageNum.value + '&limit=' + limit.value;

        fetch(url)
            .then((response) => {
                // Объект ответа на запрос

                console.log('response', response);
                // Превращаем объект в JSON. Мы не можем его сразу прочитать,
                // надо отдать в следующий then
                const result = response.json();
                console.log('result', result);
                return result;
            })
            .then((data) => {
                //console.log(data);
                let cards = '';

                data.forEach(item => {
                    const cardBlock = `
              <div class="card">
                <img
                  src="${item.download_url}"
                  class="card-image"
                />
                <p>${item.author}</p>
              </div>
            `;
                    cards = cards + cardBlock;
                });

                resultNode.innerHTML = cards;

            })
            .catch(() => { console.log('error') });
    }


});

if (!resultNode.innerHTML) {
    let page = localStorage.getItem('pageNum');
    let lim = localStorage.getItem('limit');
    console.log('page', page);
    console.log('lim', lim);
    if (page !== null && lim !== null) {
        let url = 'https://picsum.photos/v2/list?page=' + page + '&limit=' + lim;
        console.log(url);
        fetch(url)
            .then((response) => {
                // Объект ответа на запрос

                console.log('response', response);
                // Превращаем объект в JSON. Мы не можем его сразу прочитать,
                // надо отдать в следующий then
                const result = response.json();
                console.log('result', result);
                return result;
            })
            .then((data) => {
                //console.log(data);
                let cards = '';

                data.forEach(item => {
                    const cardBlock = `
              <div class="card">
                <img
                  src="${item.download_url}"
                  class="card-image"
                />
                <p>${item.author}</p>
              </div>
            `;
                    cards = cards + cardBlock;
                });

                resultNode.innerHTML = cards;

            })
            .catch(() => { console.log('error') });
    }
}


btnClearNode.addEventListener('click', () => {
    localStorage.clear();
    console.log('Данные из localStorage удалены');
    resultNode.innerHTML = '';
});