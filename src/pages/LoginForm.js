import React, { useState } from 'react';
import {
    Flex,
    Box,
    Heading,
    FormControl,
    FormLabel,
    Input,
    Button,
    CircularProgress,
    Text
} from '@chakra-ui/core';
import { userLogin } from '../utils/mockApi';
import ErrorMessage from '../components/ErrorMessage';
import Password from '../components/Password';


export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const handlePasswordVisibility = () => setShowPassword(!showPassword);
    const handleSubmit = event => {
        event.preventDefault();
        setIsLoading(true);
        userLogin({ email, password }).then(() => {
            setIsLoggedIn(true);
            setIsLoading(false);
            setShowPassword(false);
        }).catch(() => {
            setError('Invalid username or password');
            setIsLoading(false);
            setEmail('');
            setPassword('');
            setShowPassword(false);
        });
    };
    return (
        <Flex width="full" align="center" justifyContent="center">
            <Box p={8} maxWidth="500px" borderWidth={1} borderRadius={8} boxShadow="lg">
                {isLoggedIn ? (
                    <Box textAlign="center">
                        <Text>{email} logged in!</Text>
                        <Button
                            variantColor="orange"
                            variant="outline"
                            width="full"
                            mt={4}
                            onClick={() => setIsLoggedIn(false)}
                        >
                            Sign out
            </Button>
                    </Box>
                ) : (
                        <>
                            <Box p={2}>
                                <Box textAlign="center">
                                    <Heading>Login</Heading>
                                </Box>
                            </Box>
                            <Box my={4} textAlign="left">
                                <form onSubmit={handleSubmit}>
                                    {error && <ErrorMessage message={error} />}
                                    <FormControl isRequired>
                                        <FormLabel>Email</FormLabel>
                                        <Input
                                            type="email"
                                            placeholder="test@test.com"
                                            size="lg"
                                            onChange={event => setEmail(event.currentTarget.value)}
                                        />
                                    </FormControl>
                                    <Password showPassword={showPassword} setPassword={setPassword} handlePasswordVisibility={handlePasswordVisibility}/ >
                                    <Button
                                        width="full"
                                        type="submit"
                                        variantColor="teal"
                                        variant="outline"
                                        mt={4}
                                    >
                                        {isLoading ? (
                                            <CircularProgress isIndeterminate size="24px" color="teal" />
                                        ) : (
                                                'Sign In'
                                            )}
                                    </Button>
                                </form>
                            </Box>
                        </>
                    )}
            </Box>
        </Flex >
    );
}