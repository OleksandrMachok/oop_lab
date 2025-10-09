// Встановлення поточного року для коректного обчислення віку 
const CURRENT_YEAR = new Date().getFullYear();

const persons = [
    { name: 'John', age: 23, city: 'Boston' },
    { name: 'Alice', age: 30, city: 'New York' },
    { name: 'Bob', age: 20, city: 'Chicago' },
    { name: 'Eva', age: 28, city: 'Boston' },
    { name: 'David', age: 25, city: 'Miami' }
];

// Встановлення кастомних властивостей для масиву
persons.groupName = 'A';
persons.teacher = 'Joan Doe';
persons.year = '2023';

// Виведення елементів масиву
for (const person of persons) {
    console.log(`- ${person.name}, ${person.age} років`);
}

// Виведення властивостей масиву 
for (const key in persons) {
    if (persons.hasOwnProperty(key) && isNaN(Number(key))) {
        console.log(`Властивість ${key}: ${persons[key]}`);
    }
}

const defaults = { mode: 'test', debugLevel: 'error', logFolder: 'root' };
const userSetting = { mode: 'production', debugLevel: 'trace', timeout: 5000 };

function mergeSettings(defaults, userSetting) {
    console.log("Об'єднання об'єктів (пріоритет у userSetting):");

    // 1. Спосіб: Оператор розгортання 
    const merged1 = { ...defaults, ...userSetting };
    console.log("1. Spread Operator (...):", merged1);

    // 2. Спосіб: Object.assign()
    const merged2 = Object.assign({}, defaults, userSetting);
    console.log("2. Object.assign():", merged2);

    // 3. Спосіб: JSON методи (якщо об'єкти прості)
    const merged3 = JSON.parse(JSON.stringify(defaults));
    for (const key in userSetting) {
        merged3[key] = userSetting[key];
    }
    console.log("3. Ручний перебір (з копіюванням):", merged3);
}

mergeSettings(defaults, userSetting);

const person = persons[0]; 

// Додаємо властивість birthYear
Object.defineProperty(person, 'birthYear', {
    get: function() {
        return CURRENT_YEAR - this.age; 
    },
    enumerable: true,
});

console.log(`Рік народження для ${person.name}: ${person.birthYear}`); 
person.birthYear = 1950; // Спроба змінити ігнорується
console.log(`Рік після спроби зміни: ${person.birthYear}`); 

const fragments = persons.map(p => {
    // Рік народження обчислюється, використовуючи властивість з п.3
    const birthYear = CURRENT_YEAR - p.age; 
    return `${p.name} from ${p.city} born in ${birthYear}`;
});

console.log("Текстові фрагменти:", fragments);

const olderThan20 = persons.filter(p => p.age > 20);

console.log("Старші за 20 років (імена):", olderThan20.map(p => p.name));

// 7.1. Деструктуризація об'єкта
const { name, city } = persons[0];
console.log(`Деструктуризація об'єкта: ${name}, ${city}`);

// 7.2. Деструктуризація масиву
const [firstElement] = persons;
console.log(`Деструктуризація масиву (перший елемент): ${firstElement.name}`);

function getUserData(userName) {
    const user = persons.find(p => p.name.toLowerCase() === userName.toLowerCase());

    if (user) {
        return user;
    } else {
        throw new Error(`Unable to find user with name: ${userName}`);
    }
}

function showUserInfo(userName) {
    console.log('Loading');

    try {
        const user = getUserData(userName);
        console.log(`\n--- Знайдено користувача ${userName} ---`);
        console.log(user);
        
    } catch (error) {
        console.error(`\nПомилка: ${error.message}`);
        
    } finally {
        // Виконується незалежно від результату
        console.log('Loading finished');
    }
}

showUserInfo('Bob'); 
console.log('---------------------------------');
showUserInfo('NonExistent'); 

// 9. Перетворення текстового фрагмента на масив букв
function stringToArrayOfChars(text) {
    return text.split('');
}
console.log(`9. Текст у букви: ${stringToArrayOfChars("Hello")}`);

// 10. Відображення букв слова у зворотному порядку
function reverseWord(word) {
    return word.split('').reverse().join('');
}
console.log(`10. Слово у зворотному порядку: ${reverseWord("Algorithm")}`);

// 11. Визначення чи ім’я файлу формату ‘.js’
function isJsFile(fileName) {
    return fileName.toLowerCase().endsWith('.js'); 
}
console.log(`11. isJsFile('test.js'): ${isJsFile("test.js")}`);
console.log(`11. isJsFile('index.html'): ${isJsFile("index.html")}`);

// 12. Перетворення речення на масив слів
function sentenceToWords(sentence) {
    const cleanedSentence = sentence.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
    return cleanedSentence.split(/\s+/).filter(Boolean);
}
console.log(`12. Речення у слова: ${sentenceToWords("Це чудове речення, чи не так?")}`);

// 13. Заміна певного слова у текстовому фрагменті
function replaceWordInText(text, wordToReplace, newWord) {
    const regex = new RegExp(wordToReplace, 'g');
    return text.replaceAll(regex, newWord);
}
const initialText = "JS є кращим, ніж я очікував. Я люблю JS.";
const finalText = replaceWordInText(initialText, "JS", "JavaScript");
console.log(`13. Заміна слова: ${finalText}`);