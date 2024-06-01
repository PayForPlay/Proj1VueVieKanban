//services/taskService.js
const Board = require("../models/Task/Board");

exports.getBoardData = async () => {
  const boardList = await Board.find()
  if (!boardList.length) {
    throw new Error("Доска не найдена");
  }
  return boardList
};

exports.addBoard = async (data) => {
  const newBoard = new Board({
    name: data.board.name,
    columns: data.board.columns,
  });
  return await newBoard.save();
};

exports.updateBoard = async (data) => {
  const board = await Board.findByIdAndUpdate(
    data.board._id,
    {
      $set:{...data.board}
    },{
      new: true
    }
    );

  if (!board) {
    throw new Error("Доска не найдена");
  }

  return board;
};

exports.addTask = async (req) => {
  const data = req.body
  if (data.task._id === "") {
    delete data.task._id
  }
  const task = {
    createdBy: req.user._id,
    ...data.task
  };
  const updatedBoard = await Board.findByIdAndUpdate(
    data.boardId,
    {
      $push: { 'columns.$[column].tasks': task },
    },
    {
      new: true,
      arrayFilters: [{ 'column._id': data.columnId }]
    }
  );
  const addedTask = updatedBoard.columns
    .find((col) => col._id.toString() === data.columnId)
    .tasks.find((task) => task.title === data.task.title);

  if (!addedTask) {
    throw new Error('Ошибка получения добавленного задания');
  }
  return addedTask;
};

exports.updateTask = async (data) =>{
    const updatedBoard = await Board.findByIdAndUpdate(data.boardId,
      {
        $set:{ 'columns.$[column].tasks.$[task]': data.task},
      },
      {
        new: true,
        arrayFilters: [{ 'column._id': data.columnId },{ 'task._id': data.taskId }],
        populate: 'columns.tasks',
      }
    );
    const addedTask = updatedBoard.columns
    .find((col) => col._id.toString() === data.columnId)
    .tasks.find((task) => task.title === data.task.title);

  if (!addedTask) {
    throw new Error('Ошибка получения измененного задания');
  }

  return addedTask;
}

exports.updateSubtask = async (data) => {
  const updatedBoard = await Board.findByIdAndUpdate(data.boardId,
    {
      $set:{ 'columns.$[column].tasks.$[task].subtasks.$[subtask]': data.subtask},
    },
    {
      new: true,
      arrayFilters: [{ 'column._id': data.columnId }, { 'task._id': data.taskId }, { 'subtask._id': data.subtask._id }],
      populate: 'columns.tasks.subtasks',
    }
  );
  const changedTask = updatedBoard.columns
    .find((col) => col._id.toString() === data.columnId)
    .tasks.find((task) => task._id.toString() === data.taskId)

  if (!changedTask) {
    throw new Error('Ошибка получения измененного задания');
  }

  return changedTask;
}

exports.deleteTask = async (data) => {
  const updatedBoard = await Board.findOneAndUpdate(
    { _id: data.boardId, "columns._id": data.columnId },
    { $pull: { "columns.$.tasks": { _id: data.taskId } } },
    { new: true }
  ).populate("columns.tasks");

  if (!updatedBoard) {
    throw new Error("Ошибка удаления");
  }

  return updatedBoard;
};

exports.deleteBoard = async (data) => {
  const result = await Board.deleteOne({ _id: data.boardId });

  if (result.deletedCount === 0) {
    throw new Error("Доска не найдена");
  }

  return result;
};
