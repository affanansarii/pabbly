const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const Task = require('../models/Task');
const router = express.Router();

// Create a Task
router.post('/', protect, async (req, res) => {
    const { title, description, dueDate, priority } = req.body;
    const task = new Task({
        user: req.user._id,
        title,
        description,
        dueDate,
        priority,
    });
    const createdTask = await task.save();
    res.status(201).json(createdTask);
});

// Get All Tasks
router.get('/', protect, async (req, res) => {
    const tasks = await Task.find({ user: req.user._id });
    res.json(tasks);
});

// Get Task By ID
router.get('/:id', protect, async (req, res) => {
    const task = await Task.findById(req.params.id);
    if (task) {
        res.json(task);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});

// Update Task
router.put('/:id', protect, async (req, res) => {
    const { title, description, dueDate, priority, status } = req.body;
    const task = await Task.findById(req.params.id);

    if (task) {
        task.title = title || task.title;
        task.description = description || task.description;
        task.dueDate = dueDate || task.dueDate;
        task.priority = priority || task.priority;
        task.status = status || task.status;

        const updatedTask = await task.save();
        res.json(updatedTask);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});

// Delete Task
router.delete('/:id', protect, async (req, res) => {
    const task = await Task.findById(req.params.id);
    if (task) {
        await task.remove();
        res.json({ message: 'Task removed' });
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});

module.exports = router;
