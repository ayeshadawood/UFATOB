const express = require("express");
const router = express.Router();

const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const ToDo = require("../../models/ToDo");

// @route   POST api/todo
// @desc    Create a reminder for a task
// @access  Private
router.post(
  "/",
  [auth, [check("task", "Empty Field").not().isEmpty()]],
  async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { task } = req.body;

    console.log(task);

    try {
      //creating task
      todo = new ToDo({ task });
      await todo.save();
      res.json(todo);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error");
    }
  }
);

// @route   GET api/todo
// @desc    Show all tasks to be done
// @access  Private
router.get("/", async (req, res) => {
  try {
    const todos = await ToDo.find().sort({ date: -1 });

    res.json(todos);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   Delete api/todo/:id
// @desc    Delete a Task
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const todo = await ToDo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ msg: "Task Not Removed" });
    }

    await todo.remove();

    res.json({ msg: "Task Removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(404).json({ msg: "Task Not Removed" });
    }
    res.status(500).send("Server Error");
  }
});
module.exports = router;
