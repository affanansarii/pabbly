import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const { data } = await axios.post('/users/login', { email, password }, config);
        localStorage.setItem('token', data.token);
        navigate('/');
    };

    return (
        <Box as="form" onSubmit={submitHandler} p={4}>
            <FormControl id="email" mb={4}>
                <FormLabel>Email</FormLabel>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </FormControl>

            <FormControl id="password" mb={4}>
                <FormLabel>Password</FormLabel>
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </FormControl>

            <Button type="submit" colorScheme="teal" width="full">
                Login
            </Button>
        </Box>
    );
};

export default LoginPage;
