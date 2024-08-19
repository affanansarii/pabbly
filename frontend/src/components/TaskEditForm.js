import React, { useEffect, useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Textarea, Select } from '@chakra-ui/react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const TaskEditForm = () => {
    const { id } = useParams();
    const [task, setTask] = useState({});
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState('low');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTask = async () => {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            };
            const { data } = await axios.get(`http://localhost:5000/tasks/${id}`, config);
            setTask(data);
            setTitle(data.title);
            setDescription(data.description);
            setDueDate(data.dueDate.split('T')[0]);
            setPriority(data.priority);
        };

        fetchTask();
    }, [id]);

    const submitHandler = async (e) => {
        e.preventDefault();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        };

        const { data } = await axios.put(`http://localhost:5000/tasks/${id}`, { title, description, dueDate, priority }, config);
        navigate('/');
    };

    return (
        <Box as="form" onSubmit={submitHandler} p={4}>
            <FormControl id="title" mb={4}>
                <FormLabel>Title</FormLabel>
                <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </FormControl>

            <FormControl id="description" mb={4}>
                <FormLabel>Description</FormLabel>
                <Textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
            </FormControl>

            <FormControl id="dueDate" mb={4}>
                <FormLabel>Due Date</FormLabel>
                <Input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
            </FormControl>

            <FormControl id="priority" mb={4}>
                <FormLabel>Priority</FormLabel>
                <Select value={priority} onChange={(e) => setPriority(e.target.value)} required>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </Select>
            </FormControl>

            <Button type="submit" colorScheme="teal" width="full">
                Update Task
            </Button>
        </Box>
    );
};

export default TaskEditForm;
