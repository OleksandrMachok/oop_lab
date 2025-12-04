
const average = (...args) => {
  if (args.length === 0) return 0;
  const sum = args.reduce((acc, val) => acc + val, 0);
  return sum / args.length;
};

console.log('Завдання 1:', average(1, 2, 3, 4, 5)); // 3

const values = (f, low, high) => {
  const result = [];
  for (let i = low; i <= high; i++) {
    result.push(f(i));
  }
  return result;
};

console.log('Завдання 2:', values(x => x * x, 1, 5)); // [1, 4, 9, 16, 25]

const callWithContext = (context, callback) => {
  callback.call(context);
};

const person = { name: 'Анна', age: 28 };
const happyBirthday = function() {
  console.log(`Завдання 3: Happy birthday ${this.name}!`);
};

callWithContext(person, happyBirthday); 

const createCounter = () => {
  let value = 0;
  return {
    increment: () => value++,
    getValue: () => value,
  };
};

const counter = createCounter();
counter.increment();
counter.increment();
console.log('Завдання 4:', counter.getValue()); 

const createMemoizedGreeting = () => {
  let lastArg = null;
  let lastResult = null;

  return (name) => {
    if (name === lastArg) {
      console.log('(з кешу)');
      return lastResult;
    }
    console.log('(нове обчислення)');
    lastResult = `Hello ${name}`;
    lastArg = name;
    return lastResult;
  };
};

const getGreeting = createMemoizedGreeting();
console.log('Завдання 5:', getGreeting('Іван'));
console.log('Завдання 5:', getGreeting('Іван'));

const add = (a) => (b) => a + b;

const addFive = add(5);
console.log('Завдання 6:', addFive(10)); 
console.log('Завдання 6 (інший виклик):', add(3)(4)); 

const createArrayChecker = (arr) => (str) => arr.includes(str);

const fruits = ['яблуко', 'банан', 'апельсин'];
const checkFruit = createArrayChecker(fruits);
console.log('Завдання 7 (true):', checkFruit('банан'));
console.log('Завдання 7 (false):', checkFruit('груша'));

const capitalizeProperty = (arr, propName) => {
  return arr.map(obj => ({
    ...obj,
    [propName]: obj[propName].charAt(0).toUpperCase() + obj[propName].slice(1),
  }));
};

const users = [{ name: 'тетяна' }, { name: 'олег' }];
console.log('Завдання 8:', capitalizeProperty(users, 'name'));

console.log('\n--- Завдання 9: call, apply, bind ---');
const developer = { name: 'Максим', stack: 'JavaScript' };
function introduce(lang1, lang2) {
  console.log(`Привіт, я ${this.name}. Моя спеціалізація - ${this.stack}. Також знаю ${lang1} та ${lang2}.`);
}

console.log('call:');
introduce.call(developer, 'HTML', 'CSS');

console.log('apply:');
introduce.apply(developer, ['Python', 'SQL']);

console.log('bind:');
const introduceDeveloper = introduce.bind(developer, 'Java', 'C#');
introduceDeveloper();

const withLogging = (callback) => {
  return (...args) => {
    console.log(`\n--- Завдання 10: Лог ---`);
    console.log(`Функція "${callback.name}" викликана з аргументами:`, args);
    return callback(...args);
  };
};

const multiply = (a, b) => a * b;
const loggedMultiply = withLogging(multiply);
console.log('Результат:', loggedMultiply(5, 7));

const cacheFor = (func, durationSeconds) => {
  let cache = null;
  let cacheTime = null;
  const durationMs = durationSeconds * 1000;

  return (...args) => {
    const now = Date.now();
    if (cache && cacheTime && (now - cacheTime < durationMs)) {
      console.log('Повернення з кешу (актуальний)...');
      return cache;
    }
    console.log('Обчислення нового значення...');
    cache = func(...args);
    cacheTime = now;
    return cache;
  };
};

const fetchData = () => `some data fetched at ${new Date().toLocaleTimeString()}`;
const cachedFetch = cacheFor(fetchData, 10);

console.log('\n--- Завдання 11 ---');
console.log(cachedFetch()); 
setTimeout(() => console.log(cachedFetch()), 5000); 
setTimeout(() => console.log(cachedFetch()), 12000); 