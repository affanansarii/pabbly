import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Input, Button, Heading, Textarea } from '@chakra-ui/react';
import axios from 'axios';

function EditTaskPage() {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTask = async () => {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:5000/tasks/${id}`, {
                headers: { Authorization: token },
            });
            setTitle(response.data.title);
            setDescription(response.data.description);
            setDueDate(new Date(response.data.dueDate).toISOString().split('T')[0]);
        };
        fetchTask();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        await axios.put(
            `http://localhost:5000/tasks/${id}`,
            { title, description, dueDate },
            {
                headers: { Authorization: token },
            }
        );
        navigate('/');
    };

    return (
        <Box>
            <Heading>Edit Task</Heading>
            <form onSubmit={handleSubmit}>
                <Input
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    mt={4}
                />
                <Textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    mt={4}
                />
                <Input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    mt={4}
                />
                <Button type="submit" colorScheme="blue" mt={4}>
                    Save
                </Button>
            </form>
        </Box>
    );
}

export default EditTaskPage;
