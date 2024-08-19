const Task = require('../models/Task');

exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.id });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.createTask = async (req, res) => {
    const { title, description, dueDate, priority } = req.body;
    try {
        const task = await Task.create({
            user: req.user.id,
            title,
            description,
            dueDate,
            priority,
        });
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task || task.user.toString() !== req.user.id) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateTask = async (req, res) => {
    try {
        let task = await Task.findById(req.params.id);
        if (!task || task.user.toString() !== req.user.id) {
            return res.status(404).json({ message: 'Task not found' });
        }

        task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task || task.user.toString() !== req.user.id) {
            return res.status(404).json({ message: 'Task not found' });
        }

        await task.remove();
        res.status(200).json({ message: 'Task removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
