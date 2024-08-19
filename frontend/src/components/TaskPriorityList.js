import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import TaskList from './TaskList';

const TaskPriorityList = ({ priority }) => {
    return (
        <Box p={4} bgColor={priority === 'high' ? 'red.100' : priority === 'medium' ? 'yellow.100' : 'green.100'} borderRadius="md" mb={4}>
            <Heading as="h2" size="md" mb={4}>
                {priority.charAt(0).toUpperCase() + priority.slice(1)} Priority Tasks
            </Heading>
            <TaskList priority={priority} />
        </Box>
    );
};

export default TaskPriorityList;
