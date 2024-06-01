// boards.js
import { defineStore } from "pinia";
import KanbanData from "../../api/kanbanData";

// Создание хранилища Pinia с именем useBoardsStore
export const useBoardsStore = defineStore({
  id: "boards", // Уникальный идентификатор для хранилища
  state: () => ({
    // Начальное состояние хранилища
    boards: [], // Массив для хранения досок
    selectedBoard: 0, // Индекс текущей выбранной доски
    selectedColumn: 0, // Индекс текущего выбранного столбца
    selectedTask: 0, // Индекс текущей выбранной задачи
    draggedTask: 0, // Индекс текущей перетаскиваемой задачи (в данный момент не используется)
  }),
  getters: {
    // Getters - это функции, которые вычисляют производное состояние на основе текущего состояния
    getColumns: (state) => state.boards[state.selectedBoard]?.columns,
    // Получить объект текущей доски
    getCurrentBoard: (state) => state.boards[state.selectedBoard],
    // Получить объект текущего столбца
    getCurrentColumn: (state) =>
      state.boards[state.selectedBoard]?.columns[state.selectedColumn],
    // Получить объект текущей задачи
    getTask: (state) =>
      state.boards[state.selectedBoard]?.columns[state.selectedColumn]?.tasks[
        state.selectedTask
      ],
    // Получить массив названий столбцов текущей доски
    getColumnsNames: (state) =>
      state.boards[state.selectedBoard]?.columns.map((c) => c.name),
  },
  actions: {
    // Actions - это функции, которые можно вызывать для выполнения асинхронных операций или изменения состояния
    async changeTaskColumn(index) {
      // Переместить текущую выбранную задачу в другой столбец
      if (!(index === this.selectedColumn)) {
        let sendData = {
          boardId: this.getCurrentBoard._id,
          columnIdfrom: this.getCurrentColumn?._id,
          columnIdto: this.getColumns[index]?._id,
          taskId: this.getTask._id,
          task: this.getTask,
        };
        const response = await KanbanData.changeTaskColumn(sendData);
        // Добавить текущую задачу в массив задач целевого столбца
        this.getCurrentBoard?.columns[index]?.tasks.push(response.task);
        // Удалить текущую задачу из массива задач исходного столбца
        this.getCurrentColumn?.tasks.splice(this.selectedTask, 1);
        // Обновить индексы выбранного столбца и задачи
        this.selectedColumn = index;
        this.selectedTask = this.getCurrentColumn?.tasks.length - 1;
      }
    },
    saveTaskChanges({ task, column }) {
      // Сохранить изменения в текущей задаче
      this.getCurrentColumn.tasks[this.selectedTask] = task;
      // Если задача перемещена в другой столбец, вызвать действие changeTaskColumn
      if (this.selectedColumn !== column) {
        this.changeTaskColumn(column);
      }
    },
    async getData(){
      try {
        const jsonData = await KanbanData.fetchAll();
        this.boards = jsonData.boards;
      } catch (error) {
        // Здесь могут быть действия по обработке исключения, но автор оставил этот блок пустым
      }

    }
  },
});
