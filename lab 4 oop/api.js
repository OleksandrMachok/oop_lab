
window.API = (() => {
  const USERS = [
    { firstname: "Олексій",  lastname: "Шевченко", score: 12 },
    { firstname: "Марія",    lastname: "Коваль",     score: 8  },
    { firstname: "Іван",     lastname: "Петренко",   score: 15 },
    { firstname: "Наталія",  lastname: "Мельник",    score: 20 },
    { firstname: "Юрій",     lastname: "Климчук",    score: 5  },
    { firstname: "Олена",    lastname: "Бондаренко", score: 14 },
    { firstname: "Дмитро",   lastname: "Голянич",    score: 9  },
    { firstname: "Світлана", lastname: "Кравченко",  score: 11 },
    { firstname: "Роман",    lastname: "Ткаченко",   score: 7  },
    { firstname: "Вікторія", lastname: "Лисенко",    score: 16 },
    { firstname: "Сергій",   lastname: "Руденко",    score: 4  },
    { firstname: "Ігор",     lastname: "Федоренко",  score: 10 },
    { firstname: "Анастасія",lastname: "Олійник",    score: 19 },
    { firstname: "Михайло",  lastname: "Сидорук",    score: 6  },
    { firstname: "Галина",   lastname: "Гнатюк",     score: 13 },
    { firstname: "Павло",    lastname: "Білан",      score: 3  },
    { firstname: "Людмила",  lastname: "Козак",      score: 17 },
    { firstname: "Тарас",    lastname: "Зубенко",    score: 2  },
    { firstname: "Валентина",lastname: "Проценко",   score: 18 },
    { firstname: "Артур",    lastname: "Кубас",      score: 1  },
  ];

  function getUsersArray() {
    return USERS.map(u => ({ ...u }));
  }

  function fetchUsers() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const pool = getUsersArray();
        for (let i = pool.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [pool[i], pool[j]] = [pool[j], pool[i]];
        }
        resolve(pool.slice(0, 10));
      }, 1000);
    });
  }

  function getNewUsers() {
    return Promise.resolve(getUsersArray().slice(0, 5));
  }

  return { fetchUsers, getNewUsers };
})();
