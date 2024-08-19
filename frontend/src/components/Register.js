import React, { useState } from 'react';
import { Box, Button, Input, VStack } from '@chakra-ui/react';
import axios from 'axios';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/register', { username, password });
        // Redirect to login
    };

    return (
        <Box>
            <form onSubmit={handleRegister}>
                <VStack spacing={4}>
                    <Input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <Button type="submit" colorScheme="teal">Register</Button>
                </VStack>
            </form>
        </Box>
    );
};

export default Register;