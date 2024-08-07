const router = require("express").Router();
const Task = require("../models/task");
const user = require("../models/user");
const User = require("../models/user");
const { authenticateToken } = require("./auth");
//create-task APIs
router.post("/create-task", authenticateToken, async (req, res) => {
  try {
    const { title, desc } = req.body;
    const { id } = req.headers;
    const newTask = new Task({
      title: title,
      desc: desc,
    });
    const saveTask = await newTask.save();
    const taskId = saveTask._id;
    await User.findByIdAndUpdate(id, { $push: { tasks: taskId._id } });
    res.status(200).json({ message: "Task Created" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Internal server error" });
  }
});

// get all tasks APIs
router.get("/get-all-tasks", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const userData = await User.findById(id).populate({
      path: "tasks",
      options: { sort: { createdAt: -1 } },
    }); //populate = fetch all the data from tasks & show in response
    res.status(200).json({ data: userData });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Internal Server Error" });
  }
});

// Delete tasks
router.delete("/delete-task/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.headers.id;
    await Task.findByIdAndDelete(id);
    await User.findByIdAndUpdate(userId, { $pull: { tasks: id } });
    res.status(200).json({ message: "Record Deleted" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Internal Server error" });
  }
});

//Update tasks
router.put("/update-task/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, desc } = req.body;
    await Task.findByIdAndUpdate(id, { title: title, desc: desc });
    return res.status(200).json({ message: "record Updated" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Internal Server error" });
  }
});

//Update Important tasks
router.put("/update-imp-task/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const TaskData = await Task.findById(id);
    const ImpTask = TaskData.important;
    await Task.findByIdAndUpdate(id, { important: !ImpTask });
    return res.status(200).json({ message: "record Updated" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Internal Server error" });
  }
});

//Update Complete tasks
router.put("/update-complete-task/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const TaskData = await Task.findById(id);
    const CompleteTask = TaskData.complete;
    await Task.findByIdAndUpdate(id, { complete: !CompleteTask });
    return res.status(200).json({ message: "record Updated" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Internal Server error" });
  }
});

// get all Important tasks APIs
router.get("/get-imp-tasks", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const Data = await User.findById(id).populate({
      path: "tasks",
      match: { important: true },
      options: { sort: { createdAt: -1 } },
    });
    const ImpTaskData = Data.tasks;
    res.status(200).json({ data: ImpTaskData });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Internal Server Error" });
  }
});

// get complete tasks APIs
router.get("/get-complete-tasks", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const Data = await User.findById(id).populate({
      path: "tasks",
      match: { complete: true },
      options: { sort: { createdAt: -1 } },
    });
    const CompleteTaskData = Data.tasks;
    res.status(200).json({ data: CompleteTaskData });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Internal Server Error" });
  }
});

// get Incomplete tasks APIs
router.get("/get-incomplete-tasks", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const Data = await User.findById(id).populate({
      path: "tasks",
      match: { complete: false },
      options: { sort: { createdAt: -1 } },
    });
    const IncompleteTaskData = Data.tasks;
    res.status(200).json({ data: IncompleteTaskData });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Internal Server Error" });
  }
});
module.exports = router;
