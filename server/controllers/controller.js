const NewsModel = require("../models/Schema");
const asyncWrapper = require("../middlewares/async");
const { createCustomError } = require("../errors/error");

/**
 * @description GET ALL THE TASK
 * @function getAllTask
 */
const getAllTasks = asyncWrapper(async (req, res) => {
  const allTask = await NewsModel.find({});
  if (allTask.length === 0)
    return res
      .status(200)
      .send({ data: [], msg: "No task found in collection" });
  return res.status(200).json({ data: allTask });
});

/**
 * @description CREATE A NEW TASK
 * @function createNewTask
 */
const createNewTask = async (req, res, next) => {
  const data = req.body;
  let keyLength = 0;
  console.log(data);
  for (keys in data) {
    keyLength++;
  }

  if (keyLength === 0) {
    return next(
      createCustomError(
        "Please provide title and description body for task.",
        400
      )
    );
  }

  const date = new Date().toUTCString();
  const newTask = { ...data, createdAt: date };

  try {
    const taskCreated = await NewsModel.create(newTask);
    return res.status(201).redirect("/");
  } catch (error) {
    if (error.code === 11000)
      return next(
        createCustomError(
          `Task with title ${newTask.title} already exist....`,
          500
        )
      );

    return next(error);
  }
};

/**
 * @description GET A SINGLE TASK
 * @function getTask
 */
const getTask = asyncWrapper(async (req, res, next) => {
  const id = req.params.id;
  const singleTask = await NewsModel.findOne({ _id: id });
  if (!singleTask) {
    return next(createCustomError(`No task with id: ${id}`, 404));
  }
  return res.json(singleTask);
});

/**
 * @DESCRIPTION UPDATE A TASK
 * @function updateTask
 */
const updateTask = asyncWrapper(async (req, res, next) => {
  const id = req.params.id;
  const data = req.body;

  const updatedTask = await NewsModel.findOneAndUpdate({ _id: id }, data, {
    returnDocument: "after",
    runValidators: true,
  });
  if (!updatedTask) {
    return next(createCustomError(`No task with id: ${id}`, 404));
  }
  return res.json({ data: updatedTask, ok: true });
});

/**
 * @DESCRIPTION DELETE A TASK
 * @function deleteTask
 */
const deleteTask = asyncWrapper(async (req, res) => {
  const id = req.params.id;

  const deletedTask = await NewsModel.findOneAndDelete({ _id: id });
  if (!deletedTask) {
    return next(createCustomError(`No task with id: ${id}`, 404));
  }
  return res.json({ data: deletedTask, ok: true });
});

module.exports = {
  getAllTasks,
  createNewTask,
  getTask,
  updateTask,
  deleteTask,
};
