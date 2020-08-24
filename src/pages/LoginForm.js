import React, { useState } from 'react';
import {
    Flex,
    Box,
    Heading
} from '@chakra-ui/core';
import { userLogin } from '../utils/mockApi';
import ErrorMessage from '../components/ErrorMessage';
import Email from '../components/Email';
import Password from '../components/Password';
import Submit from '../components/Submit';
import PostLogin from '../components/PostLogin';


export default function LoginForm() {
    const [loginContext, setLoginContext] = useState({
        email: '',
        password: '',
        showPassword: false,
        error: '',
        isLoading: false,
        isLoggedIn: false
    });

    const handleSubmit = event => {
        event.preventDefault();
        setLoginContext(prevState => {
            return {
                ...prevState,
                isLoading: true,
            };
        });
        userLogin({ email: loginContext.email, password: loginContext.password }).then(() => {
            setLoginContext(prevState => {
                return {
                    ...prevState,
                    isLoggedIn: true,
                    isLoading: false,
                    showPassword: false,
                    error: ''
                };
            });
        }).catch(() => {
            setLoginContext(prevState => {
                return {
                    ...prevState,
                    error: 'Invalid username or password',
                    isLoading: false,
                    email: '',
                    password: '',
                    showPassword: false
                };
            })
        });
    };
    return (
        <Flex width="full" align="center" justifyContent="center">
            <Box p={8} maxWidth="500px" borderWidth={1} borderRadius={8} boxShadow="lg">
                {loginContext.isLoggedIn ? <PostLogin formContext={loginContext} setContext={setLoginContext} /> : (
                        <>
                            <Box p={2}>
                                <Box textAlign="center">
                                    <Heading>Login</Heading>
                                </Box>
                            </Box>
                            <Box my={4} textAlign="left">
                                <form onSubmit={handleSubmit}>
                                    {loginContext.error && <ErrorMessage message={loginContext.error} />}
                                    <Email setContext={setLoginContext} />
                                    <Password formContext={loginContext} setContext={setLoginContext} />
                                    <Submit formContext={loginContext} />
                                </form>
                            </Box>
                        </>
                    )}
            </Box>
        </Flex >
    );
}