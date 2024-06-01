//models/InitDB.js
const User = require("./User");
const { Department, Post } = require("./Structure");
const Privilege = require("./Privilege");
const Mail = require("./Mail");
const Board = require("./Task/Board");
const Event = require("./Event")

const io = require("../Server.js");
async function Init(req, res) {
  try {
    await deleteAllModels([Board, Mail, User, Department, Post, Privilege]); 
    
    const DepartmentData = [{ name: "Цех-01" }, { name: "Цех-02" }];
    await addModels(Department, DepartmentData);
    const departmentId1 = await findIdByValue(Department, "name", "Цех-01");
    const departmentId2 = await findIdByValue(Department, "name", "Цех-02");
    const PostData = [
      { name: "Инженер-технолог", department: departmentId1 },
      { name: "Инженер-конструктор", department: departmentId2 },
    ];
    await addModels(Post, PostData);
    const postId1 = await findIdByValue(Post, "name", "Инженер-технолог");
    const postId2 = await findIdByValue(Post, "name", "Инженер-конструктор");
    const PrivilegeData = [
      {
        name: "Admin",
        admin: true,
        allowRegister: true,
        allowAdd: true,
        allowComment: true,
        allowDrag: true,
        allowEdit: true,
        allowRemove: true,
      },
      {
        name: "User",
        admin: false,
        allowRegister: false,
        allowAdd: true,
        allowComment: true,
        allowDrag: true,
        allowEdit: true,
        allowRemove: true,
      },
      {
        name: "Guest",
        admin: false,
        allowRegister: false,
        allowAdd: false,
        allowComment: false,
        allowDrag: false,
        allowEdit: false,
        allowRemove: false,
      },
    ];
    await addModels(Privilege, PrivilegeData);
    const PrivilegeId0 = await findIdByValue(Privilege, "name", "Admin");
    const PrivilegeId1 = await findIdByValue(Privilege, "name", "User");
    const PrivilegeId2 = await findIdByValue(Privilege, "name", "Guest");
    
    
    const UserData = [
      {
        username: "admin",
        password:
          "$2b$10$yKcQYOhpTq2ZqUxiunrOAeZXezx0kDOnXMao7pji5qzP1BA2inYrW",
        name: "admin",
        secondName: "admin",
        lastName: "admin",
        department: departmentId1,
        post: postId1,
        phone: "12-34",
        image: "../../images/people/asd.png",
        privilege: PrivilegeId0,
      },
      {
        username: "asd",
        password:
          "$2b$10$yUkfp.zleS8KnICbWbZ0beo/9tUUFu2tntZQzxoqkmf.0AC.GRhk6",
        name: "Иван",
        secondName: "Иванович",
        lastName: "Иванов",
        department: departmentId1,
        post: postId1,
        phone: "12-34",
        image: "../../images/people/asd.png",
        privilege: PrivilegeId1,
      },
      {
        username: "фыв",
        password:
          "$2b$10$6jOcEpoxkaxcC79n5Drg.eenC0guoatWe9i5mECzFGZNnFnoqSf4u",
        name: "Павел",
        secondName: "Павлович",
        lastName: "Павлов",
        department: departmentId2,
        post: postId2,
        phone: "56-78",
        image: "../../images/people/фыв.png",
        privilege: PrivilegeId2,
      },
    ]
  
  await addModels(User, UserData);
  const UserId0 = await findIdByValue(User, "username", "admin");
  const UserId1 = await findIdByValue(User, "username", "asd");
  const UserId2 = await findIdByValue(User, "username", "фыв");

    const genData = () => {
      const BoardName = ['Участок 1', 'Участок 2', 'Участок 3', 'Участок 4'];
      const ColumnName = ['Сделать', 'В работе', 'Тестирование', 'Готово'];
      const TaskTitle = ['Первое задание', 'Второе задание', 'Третье задание', 'Четвертое задание', 'Пятое задание', 'Шестое задание'];
      const TaskDescription = ['Первое описание', 'Второе описание', 'Третье описание', 'Четвертое описание', 'Пятое описание', 'Шестое описание'];
      const userId = [UserId0, UserId1, UserId2];
      const SubTaskTitle = ['Первая задача', 'Вторая задача', 'Третья задача', 'Четвертая задача', 'Пятая задача', 'Шестая задача'];
      const Priority = ['Низкий', 'Средний', 'Высокий', 'Критический']
      const getRandomDate = (start, end) => {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
      };
    
      const generateRandomBoolean = () => {
        return Math.random() < 0.25 ? true : false;
      };

      const generateRandomPriority = () => {
        const rand = Math.random()
        if (rand < 0.25) {return Priority[0]
          } else if (rand < 0.5) {return Priority[1]
          } else if (rand < 0.75) { return Priority[2]
          } else{return Priority[3]
        }
      };
    
      const getRandomDueDate = (createdAt) => {
        const dueDate = new Date(createdAt);
        dueDate.setDate(dueDate.getDate() + Math.floor(Math.random() * 3) + 3);
        return dueDate.toISOString();
      };
      
      const generateSubtasks = () => {
        // случайное количество подзадач от 1 до 4
        const numberOfSubTasks =  Math.floor(Math.random() * (6 - 3 + 1)) + 3;
        const subtasks = [];
      
        for (let i = 0; i < numberOfSubTasks; i++) {
          subtasks.push({
            title: SubTaskTitle[Math.floor(Math.random() * SubTaskTitle.length)],
            isCompleted: generateRandomBoolean(),
          });
        }
      
        return subtasks;
      };
    
      const generateTasks = () => {
        const numberOfTasks = Math.floor(Math.random() * (6 - 4 + 1)) + 4;
        const tasks = [];
        for (let i = 0; i < numberOfTasks; i++) {
          const createdAt = getRandomDate(new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), new Date());
          const task = {
            title: TaskTitle[i],
            description: TaskDescription[i],
            createdBy: userId[Math.floor(Math.random() * userId.length)],
            createdAt: createdAt.toISOString(),
            responsibleAt: userId[Math.floor(Math.random() * userId.length)],
            dueAt: getRandomDueDate(createdAt),
            subtasks: generateSubtasks(), 
            priority: generateRandomPriority()
          };
          tasks.push(task);
        }
        return tasks;
      };
    
      const generateColumns = () => {
        const columns = [];
        for (let i = 0; i < ColumnName.length; i++) {
          const column = {
            name: ColumnName[i],
            tasks: generateTasks()
          };
          columns.push(column);
        }
        return columns;
      };
    
      const generateBoards = () => {
        const boards = [];
        for (let i = 0; i < BoardName.length; i++) {
          const board = {
            name: BoardName[i],
            columns: generateColumns()
          };
          boards.push(board);
        }
        return boards;
      };
    
      const BoardDataGen = generateBoards();
      return BoardDataGen;
    };
    BoardData = genData()
    

    
    
    const genDataMail = () => {
      const titles = ['Первое письмо', 'Второе письмо', 'Третье письмо', 'Четвертое письмо'];
      const body = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Non blandit massa enim nec dui nunc. Laoreet non curabitur gravida arcu ac tortor dignissim. Id porta nibh venenatis cras. Nisi scelerisque eu ultrices vitae auctor. Vitae tempus quam pellentesque nec nam aliquam sem et tortor. Ut eu sem integer vitae justo eget magna fermentum iaculis. Venenatis cras sed felis eget velit aliquet sagittis id. Eget nullam non nisi est sit amet. Pharetra magna ac placerat vestibulum lectus mauris ultrices eros.'; // упрощенный текст
      const users = [UserId0, UserId1, UserId2];
    
      let mailData = [];

      function generateRandomBodySnippet(bodyText) {
        const words = bodyText.split(' '); // разбиваем текст на слова
        const minLength = 6; // минимальная длина сниппета
        let randomStart = Math.floor(Math.random() * (words.length - minLength));
        let randomEnd = randomStart + minLength + Math.floor(Math.random() * (words.length - randomStart - minLength));
        
        // Ограничиваем randomEnd максимальным индексом массива слов
        randomEnd = randomEnd > words.length ? words.length : randomEnd; 
      
        // Возвращаем объединенные слова в предложение
        return words.slice(randomStart, randomEnd).join(' ');
      }
    
      users.forEach((sender) => {
        // Получатели - все кроме отправителя
        const recipients = users
          .filter(user => user !== sender)
          .map(user => ({
            user: user,
            deleted: false,
            readStatus: false
          }));
        
        // Создаем 4 письма для каждого отправителя
        titles.forEach((title) => {
          mailData.push({
            title: title, // Заголовок берется из массива titles
            body: generateRandomBodySnippet(body),
            sender: sender,
            recipients: recipients
          });
        });
      });
    
      return mailData;
    };
    const MailData = genDataMail()
  
  const eventGen = () => {
      const titles = ['Первое событие', 'Второе событие', 'Третье событие', 'Четвертое событие', 'Пятое событие', 'Шестое событие'];
      const users = [UserId0, UserId1, UserId2];
      const from = "events";
      const probabilityOfTrue = 0.25;
  
      let events = [];

      function getRandomBooleanWithProbability(trueProbability) {
        return Math.random() < trueProbability;
      }
    
      function getRandomDate() {
        const today = new Date();
        const fiveDays = 5 * 24 * 60 * 60 * 1000; // Количество миллисекунд в 5 днях
        const randomTime = Math.floor(Math.random() * (fiveDays * 2 + 1)) - fiveDays; 
        // Вырастает от -5 дней до +5 дней в миллисекундах
        return new Date(today.getTime() + randomTime);
      }
    
      for (let user of users) {
        for (let title of titles) {
          let event = {
            title: title,
            date: getRandomDate(), // Использование функции для генерирования случайной даты
            completed: getRandomBooleanWithProbability(probabilityOfTrue),
            user: user,
            from: from
          };
          events.push(event);
        }
      }
    
      return events;
    };
    
  let generatedEvents = eventGen();


    // await deleteAllModels([Board, Mail]); 
    BoardData.forEach(async (item) => {
      const newBoard = new Board(item);
      try {
        console.log("new Board");
        await newBoard.save();
      } catch (error) {
        throw error;
      }
    });
    await addModels(Mail, MailData);
    await addModels(Event, generatedEvents);

    return res.json("Initialization successful");
  } catch (error) {
    console.error("Error during initialization:", error);
    return res.status(500).json("Error during initialization");
  }
}

async function deleteAllModels(models) {
  try {
    for (const model of models) {
      await model.deleteMany();
      console.log(
        `Deleted all documents from ${model.collection.collectionName}`
      );
    }
  } catch (error) {
    console.error("Ошибка удаления документов:", error);
    throw error; 
  }
}
async function findIdByValue(model, field, value) {
  const result = await model.findOne({ [field]: value });
  return result._id;
}
async function addModels(model, dataArray) {
  try {
    if (!Array.isArray(dataArray)) {
      throw new Error("dataArray не массив");
    }

    for (const data of dataArray) {
      await model.create(data);
    }
    console.log(`Записи добавлены успешно`);
  } catch (error) {
    console.error("Ошибка добавления записей:", error);
    throw error; // rethrow the error to be caught in the Init function
  }
}

module.exports = { Init };