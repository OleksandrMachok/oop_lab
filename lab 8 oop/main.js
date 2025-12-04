
// 1.1 Функція-конструктор Book
function Book(title, author, year) {
  this.title = title;
  this.author = author;
  this.year = year;
}

// 1.2 Метод у прототипі

Book.prototype.getSummary = function () {
  return `Книга '${this.title}' написана ${this.author} у ${this.year} році.`;
};

// 1.3 Створення екземплярів
const book1 = new Book("Місто", "Валер'ян Підмогильний", 1928);
const book2 = new Book("Тигролови", "Іван Багряний", 1944);

console.log(book1.getSummary());
console.log(book2.getSummary());
console.log(book1.__proto__ === Book.prototype); 

// 1.4 Розширення Array

Array.prototype.getLastElement = function () {
  return this[this.length - 1];
};

const nums = [10, 20, 30, 40];
console.log(nums.getLastElement()); 

// 2.1 Базовий клас Publication
class Publication {
  constructor(title, year) {
    this.title = title;
    this.year = year;
  }

  static type = "General Publication";

  static isRecent(publicationYear) {
    return publicationYear > 2020;
  }
}

console.log(Publication.type);
console.log(Publication.isRecent(2022)); 

// 2.2 Клас Magazine, що наслідує Publication
class Magazine extends Publication {
  constructor(title, year, issue) {
    super(title, year);
    this.issue = issue;
    this.#isDigital = false;
  }

  #isDigital;

  get digitalStatus() {
    return this.#isDigital;
  }

  set setDigital(value) {
    this.#isDigital = value;
  }

  getYearInfo() {
    return `Рік: ${this.year}`;
  }
}


// 2.4 Newspaper — наслідування + перевизначення методу

class Newspaper extends Magazine {
  getYearInfo() {
    const baseInfo = super.getYearInfo();
    return baseInfo + " (видається щоденно).";
  }
}

const dailyNews = new Newspaper("Daily Times", 2024, 15);
dailyNews.setDigital = true;
console.log(dailyNews.getYearInfo());

// 3.1 Перевірка instanceof
const objA = new Publication("Some Pub", 2000);
const objB = new Magazine("Tech Mag", 2023, 7);

console.log(objA instanceof Publication); 
console.log(objB instanceof Magazine);    
console.log(objB instanceof Publication); 