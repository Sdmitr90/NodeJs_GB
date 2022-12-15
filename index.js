import colors from "colors";

// аргумент - число указываем при вводе команды ("node index.js 100") или "npm run start"
const arg = +process.argv.slice(2);

console.log(colors.magenta('---hw1---'))

console.log('arg: ', colors.cyan(String(arg)));
// Получ
const isPrime = (num) => {
    for (let i = 2, max = Math.sqrt(num); i <= max; i++) {
        if (num % i === 0) {
            return false;
        }
    }
    return num > 1;
};

const getPrimes = (num) => {
    const result = [];

    for (let i = 2; i <= num; i++) {
        if (isPrime(i)) {
            result.push(i);
        }
    }

    if (result.length <= 0 || isNaN(arg))
        console.log(colors.red("В диапазоне нет простых чисел ;("));

    console.log('result: ', colors.blue(result));

    let counter = 0;

    result.forEach((el) => {
        if (counter === 0) {
            console.log(colors.green(el));
            counter++;
        } else if (counter === 1) {
            console.log(colors.yellow(el));
            counter++;
        } else {
            console.log(colors.red(el));
            counter = 0;
        }
    });
};

getPrimes(arg);