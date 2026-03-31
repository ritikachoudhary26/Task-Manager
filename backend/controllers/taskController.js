const Task = require("../models/Task");

// CREATE TASK
exports.createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    if (!title || !description) {
      return res.status(400).json({ msg: "Title and description are required" });
    }

    const task = new Task({
      user: req.user.id,
      title,
      description,
      status: status,
    });

    await task.save();

    res.status(201).json({ msg: "Task created", task });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

// GET TASKS with Pagination, Filter & Search
exports.getTasks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const filter = { user: req.user.id };

    if (req.query.status) filter.status = req.query.status; // pending/completed/in-progress
    if (req.query.search) filter.title = { $regex: req.query.search, $options: "i" };

    const tasks = await Task.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Task.countDocuments(filter);

    res.status(200).json({
      success: true,
      tasks,
      pagination: {
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        totalTasks: total,
      },
    });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

// UPDATE TASK
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ msg: "Task not found" });
    if (task.user.toString() !== req.user.id)
      return res.status(403).json({ msg: "Not authorized" });

    const { title, description, status } = req.body;

    if (!title || !description) {
      return res.status(400).json({ msg: "Title and description are required" });
    }

    task.title = title;
    task.description = description;
    task.status = status || task.status;

    await task.save();

    res.json({ msg: "Task updated", task });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

// DELETE TASK
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ msg: "Task not found" });
    if (task.user.toString() !== req.user.id)
      return res.status(403).json({ msg: "Not authorized" });

    await task.deleteOne();

    res.json({ msg: "Task deleted" });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};