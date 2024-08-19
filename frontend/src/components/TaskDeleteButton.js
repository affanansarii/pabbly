import React from 'react';
import { Button, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TaskDeleteButton = ({ taskId }) => {
    const toast = useToast();
    const navigate = useNavigate();

    const deleteHandler = async () => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            };

            await axios.delete(`http://localhost:5000/tasks/${taskId}`, config);
            toast({
                title: 'Task deleted.',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
            navigate('/');
        }
    };

    return (
        <Button colorScheme="red" onClick={deleteHandler}>
            Delete Task
        </Button>
    );
};

export default TaskDeleteButton;
