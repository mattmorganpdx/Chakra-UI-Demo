import React from 'react';
import {
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Icon,
    Button,
} from '@chakra-ui/core';

export default function Password({showPassword, setPassword, handlePasswordVisibility}) {
    return (<FormControl isRequired mt={6}>
        <FormLabel>Password</FormLabel>
        <InputGroup>
            <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="*******"
                size="lg"
                onChange={event => setPassword(event.currentTarget.value)}
            />
            <InputRightElement width="3rem">
                <Button h="1.5rem" size="sm" onClick={handlePasswordVisibility}>
                    {showPassword ? <Icon name="view-off" /> : <Icon name="view" />}
                </Button>
            </InputRightElement>
        </InputGroup>
    </FormControl>);
};