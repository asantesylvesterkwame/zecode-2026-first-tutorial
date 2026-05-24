const router = require("express").Router();
const Todo = require("../models/todo.model");

router.post("/", async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const newTodo = new Todo({
      title,
      description,
    });

    await newTodo.save();

    res.status(201).json({
      message: "Todo created successfully",
      data: newTodo,
    });
  } catch (error) {
    console.log("[CREATE TODO ERROR]", error);
    res.status(500).json({
      message: "An error occurred while creating the todo",
      error: error.message,
    });
  }
});
//CRUD - Create, Read, Update, Delete

router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();

    if (todos.length === 0) {
      return res.status(404).json({
        message: "No todos found",
        data: [],
      });
    }
    res.status(200).json({
      message: "Todos retrieved successfully",
      data: todos,
    });
  } catch (error) {
    console.log("[GET ALL TODO ERROR]", error);
    res.status(500).json({
      message: "An error occurred while getting all todos",
      error: error.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);

    if (!todo) {
      return res.status(404).json({
        message: "No todo found",
        data: {},
      });
    }
    res.status(200).json({
      message: "Todo retrieved successfully",
      data: todo,
    });
  } catch (error) {
    console.log("[GET TODO ERROR]", error);
    res.status(500).json({
      message: "An error occurred while getting todo",
      error: error.message,
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, isCompleted } = req.body;
    const todo = await Todo.findByIdAndUpdate(
      id,
      {
        title,
        description,
        isCompleted,
      },
      { new: true },
    );

    if (!todo) {
      return res.status(404).json({
        message: "No todo found",
        data: {},
      });
    }
    res.status(200).json({
      message: "Todo updated successfully",
      data: todo,
    });
  } catch (error) {
    console.log("[UPDATE TODO ERROR]", error);
    res.status(500).json({
      message: "An error occurred while updating Todo",
      error: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByIdAndDelete(id);

    if (!todo) {
      return res.status(404).json({
        message: "No todo found",
        data: {},                                                    
      });
    }
    res.status(200).json({
      message: "Todo deleted successfully",
    });
  } catch (error) {
    console.log("[DELETE TODO ERROR]", error);
    res.status(500).json({
      message: "An error occurred while deleting Todo",
      error: error.message,
    });
  }
});

module.exports = router;
