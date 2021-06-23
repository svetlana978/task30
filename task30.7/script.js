const btn = document.querySelector('.j-btn');
const resultNode = document.querySelector('.list');
const userID = document.querySelector('#userID');

btn.addEventListener('click', () => {
    // Делаем запрос за данными
    let url = 'https://jsonplaceholder.typicode.com/users/' + userID.value + '/todos';

    fetch(url)
        .then((response) => {
            const result = response.json();
            return result;
        })
        .then((data) => {
            if (data.length == 0)
                resultNode.innerHTML = "Пользователь с указанным id не найден";
            else {
                let list = '';
                let item = '';
                data.forEach(num => {

                    if (num.completed == true) {
                        item = `
                        <li><s>${num.title}</s></li>
                        `;
                    } else if (num.completed == false) {
                        item = `
                        <li>${num.title}</li>
                        `;
                    }

                    list = list + item;
                });

                resultNode.innerHTML = list;
            }
        })
        .catch(() => { console.log('error') });
});