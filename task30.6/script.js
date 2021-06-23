// Внимательно посмотрите за очередностью выводимых в консоль данных

// Функция выполнения promise
function usePromise() {
    // Создаем promise
    const myPromise = new Promise((resolve, reject) => {
        min = 0;
        max = 100;

        setTimeout(() => {
            let randValue = Math.floor(Math.random() * (max - min + 1)) + min;

            if (randValue % 2)
                reject("Завершено с ошибкой. Сгенерированное число — " + randValue);
            else
                resolve("Завершено успешно. Сгенерированное число — " + randValue);
            // resolve("Успешное выполнение promise");
        }, 3000);

    });

    // Выполняем promise
    myPromise
        .then((result) => {
            console.log(result);
        })
        .catch((error) => {
            console.log(error);
        })
};

usePromise();