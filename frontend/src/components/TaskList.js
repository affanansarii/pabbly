import React, { useEffect, useState } from 'react';
import { Box, Text, Button, HStack } from '@chakra-ui/react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const TaskList = ({ priority }) => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            };

            const { data } = await axios.get('http://localhost:5000/tasks', config);
            if (priority) {
                setTasks(data.filter(task => task.priority === priority));
            } else {
                setTasks(data);
            }
        };

        fetchTasks();
    }, [priority]);

    return (
        <Box mt={4}>
            {tasks.map((task) => (
                <Box key={task._id} p={4} borderWidth="1px" borderRadius="lg" mb={4}>
                    <Text fontSize="xl" fontWeight="bold">
                        {task.title}
                    </Text>
                    <Text>Due Date: {new Date(task.dueDate).toLocaleDateString()}</Text>
                    <Text>Status: {task.status}</Text>
                    <HStack mt={4}>
                        <Button as={Link} to={`/tasks/${task._id}`} colorScheme="teal">
                            View Details
                        </Button>
                        <Button colorScheme="red">Delete</Button>
                    </HStack>
                </Box>
            ))}
        </Box>
    );
};

export default TaskList;
