const btnClearNode = document.querySelector('.j-btn-clear');

let userName = localStorage.getItem('userName');
let time = localStorage.getItem('time');

if (userName) {
    // Если данные в localStorage есть - просто выводим их
    alert('Добрый день,' + userName + '! Давно не виделись. В последний раз вы были у нас ' + time);
    time = new Date();
    localStorage.setItem('time', time);
} else {
    // Если данных в localStorage нет - делаем запрос
    let userName = prompt('Добро пожаловать! Назовите, пожалуйста, ваше имя');
    let time = new Date();

    localStorage.setItem('userName', userName);
    localStorage.setItem('time', time);

}

// Вешаем обработчик на кнопку для очистки localStorage
btnClearNode.addEventListener('click', () => {
    localStorage.clear();
    console.log('Данные из localStorage удалены');
});