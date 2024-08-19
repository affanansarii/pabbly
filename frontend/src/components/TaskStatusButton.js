import React from 'react';
import { Button } from '@chakra-ui/react';
import axios from 'axios';

const TaskStatusButton = ({ taskId, status, refreshTasks }) => {
    const toggleStatus = async () => {
        const newStatus = status === 'pending' ? 'completed' : 'pending';
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        };

        await axios.put(`http://localhost:5000/tasks/${taskId}`, { status: newStatus }, config);
        refreshTasks();
    };

    return (
        <Button colorScheme={status === 'completed' ? 'green' : 'yellow'} onClick={toggleStatus}>
            Mark as {status === 'completed' ? 'Pending' : 'Completed'}
        </Button>
    );
};

export default TaskStatusButton;
