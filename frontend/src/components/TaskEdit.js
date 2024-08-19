import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"

const TaskEdit = () => {

    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState('Low');
    const navigate = useNavigate();

    useEffect(() => {

        const fetchTask = async () => {

            const token = localStorage.getItem('authToken');

            const res = await axios.get(`http://localhost:5000/tasks/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            const task = res.data;
            setTitle(task.title);
            setDescription(task.description);
            setDueDate(task.dueDate.substring(0, 10));
            setPriority(task.priority);

        };

        fetchTask();

    }, [id]);

    const handleSubmit = async (e) => {

        e.preventDefault();

        const token = localStorage.getItem('authToken');

        await axios.put(`/tasks/${id}`, { title, description, dueDate, priority }, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        navigate('/');

    }

    return (

        <form onSubmit={handleSubmit} className="task-form">

            <h2>Edit Task</h2>

            <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />

            <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />

            <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />

            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </select>

            <button type="submit">Save Changes</button>

        </form>

    )

}

export default TaskEdit;