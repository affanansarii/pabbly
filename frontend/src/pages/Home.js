import React from 'react';
import { Box, Button, Heading } from '@chakra-ui/react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <Box p={4}>
            <Heading as="h1" mb={4}>Task Management System</Heading>
            <TaskForm />
            <TaskList />
            <Button as={Link} to="/login" mt={4}>Login</Button>
            <Button as={Link} to="/register" mt={4} ml={4}>Register</Button>
        </Box>
    );
};

export default Home;
