// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const dotenv = require('dotenv');

// dotenv.config();
// const app = express();
// app.use(cors());
// app.use(express.json());

// mongoose.connect('mongodb://localhost:27017/task-manager', { useNewUrlParser: true, useUnifiedTopology: true });

// const UserSchema = new mongoose.Schema({
//     username: String,
//     password: String,
// });

// const TaskSchema = new mongoose.Schema({
//     title: String,
//     description: String,
//     dueDate: Date,
//     status: { type: String, default: 'pending' },
//     priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
//     userId: mongoose.Schema.Types.ObjectId,
// });

// const User = mongoose.model('User', UserSchema);
// const Task = mongoose.model('Task', TaskSchema);

// // User Registration
// app.post('/register', async (req, res) => {
//     const { username, password } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = new User({ username, password: hashedPassword });
//     await user.save();
//     res.json({ message: 'User registered' });
// });

// // User Login
// app.post('/login', async (req, res) => {
//     const { username, password } = req.body;
//     const user = await User.findOne({ username });
//     if (user && (await bcrypt.compare(password, user.password))) {
//         const token = jwt.sign({ id: user._id }, 'secret_101', { expiresIn: '1h' });
//         res.json({ token });
//     } else {
//         res.status(401).json({ message: 'Invalid credentials' });
//     }
// });

// // Task Management
// app.post('/tasks', async (req, res) => {
//     const task = new Task(req.body);
//     await task.save();
//     res.json(task);
// });

// app.get('/tasks', async (req, res) => {
//     const tasks = await Task.find();
//     res.json(tasks);
// });

// app.put('/tasks/:id', async (req, res) => {
//     const { id } = req.params;
//     const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true });
//     res.json(updatedTask);
// });

// app.delete('/tasks/:id', async (req, res) => {
//     const { id } = req.params;
//     await Task.findByIdAndDelete(id);
//     res.json({ message: 'Task deleted' });
// });

// app.listen(5000, () => {
//     console.log('Server running on http://localhost:5000');
// });


const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/tasks', taskRoutes);
app.use('/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
