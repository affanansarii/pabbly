import React, { useState } from 'react';
import { Box, Button, Input, VStack } from '@chakra-ui/react';
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await axios.post('http://localhost:5000/login', { username, password });
        // Save token and redirect
    };

    return (
        <Box>
            <form onSubmit={handleLogin}>
                <VStack spacing={4}>
                    <Input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <Button type="submit" colorScheme="teal">Login</Button>
                </VStack>
            </form>
        </Box>
    );
};

export default Login;