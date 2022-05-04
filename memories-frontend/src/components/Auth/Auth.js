import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  useColorModeValue,
  Icon,
  ScaleFade,
} from '@chakra-ui/react';
import { useState } from 'react';
import { FaUserLock } from 'react-icons/fa';
import { PasswordField } from './PasswordField';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export const Auth = () => {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);

  const switchMode = () => {
    setForm(initialState);
    setIsSignup(prevIsSignup => !prevIsSignup);
  };

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <ScaleFade in>
      <Container
        mt={8}
        maxW="md"
        px={3}
        bg={useColorModeValue('white', 'gray.700')}
        shadow="md"
        rounded="md"
      >
        <Stack spacing="8">
          <Stack spacing="2">
            <Stack pt={10} align="center">
              <Icon as={FaUserLock} w={12} h={12} color="pink.500" />
            </Stack>
            <Stack textAlign="center">
              <Heading size="lg">{isSignup ? 'Sign up' : 'Sign in'}</Heading>
            </Stack>
          </Stack>
          <Box pb={5} px={3}>
            <Stack spacing="6">
              <Stack spacing="5">
                {isSignup && (
                  <>
                    <FormControl>
                      <FormLabel htmlFor="firstName">First Name</FormLabel>
                      <Input
                        name="firstName"
                        handleChange={handleChange}
                        autoFocus
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel htmlFor="lastName">Last Name</FormLabel>
                      <Input name="lastName" handleChange={handleChange} />
                    </FormControl>
                  </>
                )}
                <FormControl>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    handleChange={handleChange}
                  />
                </FormControl>
                <PasswordField inputName="password" labelName="Password" />
                {isSignup && (
                  <PasswordField
                    inputName="confirmPassword"
                    labelName="Repeat Password"
                    handleChange={handleChange}
                  />
                )}
              </Stack>

              <Stack spacing="6">
                <Button colorScheme="facebook">
                  {isSignup ? 'Sign Up' : 'Sign In'}
                </Button>
                <HStack justify="end">
                  <Button
                    variant="link"
                    colorScheme="blue"
                    size="sm"
                    onClick={switchMode}
                  >
                    {isSignup
                      ? 'Already have an account? Sign in'
                      : "Don't have an account? Sign Up"}
                  </Button>
                </HStack>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </ScaleFade>
  );
};

export default Auth;
