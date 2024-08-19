import React, { useEffect, useState } from 'react';
import { Box, Heading, Text, Button } from '@chakra-ui/react';
import axios from 'axios';

const TaskDetails = ({ taskId }) => {
    const [task, setTask] = useState(null);

    useEffect(() => {
        const fetchTask = async () => {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            };
            const { data } = await axios.get(`http://localhost:5000/tasks/${taskId}`, config);
            setTask(data);
        };

        fetchTask();
    }, [taskId]);

    const markCompleted = async () => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        };

        const { data } = await axios.put(`http://localhost:5000/tasks/${taskId}`, { status: 'completed' }, config);
        setTask(data);
    };

    return (
        <Box p={4}>
            {task && (
                <>
                    <Heading as="h2" mb={4}>
                        {task.title}
                    </Heading>
                    <Text fontSize="lg" mb={4}>
                        {task.description}
                    </Text>
                    <Text mb={4}>Due Date: {new Date(task.dueDate).toLocaleDateString()}</Text>
                    <Text mb={4}>Priority: {task.priority}</Text>
                    <Text mb={4}>Status: {task.status}</Text>
                    {task.status !== 'completed' && (
                        <Button colorScheme="teal" onClick={markCompleted}>
                            Mark as Completed
                        </Button>
                    )}
                </>
            )}
        </Box>
    );
};

export default TaskDetails;
