const boardService = require("../services/boardService");

exports.getBoardData = async (req, res) => {
  try {
    const boardList = await boardService.getBoardData(req.user);
    res.status(200).json(boardList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addTask = async (req, res) => {
  try {
    const task = await boardService.addTask(req);
    res.status(201).json({message: 'Задание успешно добавленно', task});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addBoard = async (req, res) => {
  try {
    const newBoard = await boardService.addBoard(req.body);
    res.status(201).json({message: 'Доска успешно добавленна', newBoard});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateBoard = async (req, res) => {
  try {
    const updatedBoard = await boardService.updateBoard(req.body);
    res.status(201).json({message: 'Доска успешно обновленна', updatedBoard});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await boardService.updateTask(req.body);
    res.status(201).json({message: 'Задание успешно обновленно', task});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateSubtask = async (req, res) => {
  try {
    const changedTask = await boardService.updateSubtask(req.body);
    res.status(201).json({message: 'Задача успешно обновленна', changedTask});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const deletedTask = await boardService.deleteTask(req.body);
    res.status(201).json({message: 'Задание успешно удаленно'});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteBoard = async (req, res) => {
  try {
    const deletedBoard = await boardService.deleteBoard(req.body);
    res.status(201).json({message: 'Доска успешно удаленна'});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};