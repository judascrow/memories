import { useState, useEffect } from 'react';
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
  FormErrorMessage,
  useToast,
} from '@chakra-ui/react';
import { FaUserLock } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { PasswordField } from './PasswordField';

import { signin, signup } from '../../actions/auth';

export const Auth = () => {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('profile'));
    if (user) {
      navigate('/posts');
    }
    // eslint-disable-next-line
  }, []);

  const switchMode = () => {
    setIsSignup(prevIsSignup => !prevIsSignup);
  };

  const onSubmit = values => {
    if (isSignup) {
      dispatch(signup(values, navigate, toast));
    } else {
      dispatch(signin(values, navigate, toast));
    }
  };

  return (
    <ScaleFade in>
      <Container
        mt={5}
        maxW={{ base: 'xs', sm: 'md' }}
        px={3}
        bg={useColorModeValue('white', 'gray.700')}
        shadow="md"
        rounded="md"
        mb={5}
      >
        <Stack spacing="8">
          <Stack spacing="2">
            <Stack pt={5} align="center">
              <Icon as={FaUserLock} w={12} h={12} color="pink.500" />
            </Stack>
            <Stack textAlign="center">
              <Heading size="lg">{isSignup ? 'Sign up' : 'Sign in'}</Heading>
            </Stack>
          </Stack>
          <Box pb={5} px={3}>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <Stack spacing="6">
                <Stack spacing="5">
                  <FormControl isInvalid={errors.email}>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      autoFocus
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value:
                            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                          message: 'Please enter a valid email',
                        },
                      })}
                    />
                    <FormErrorMessage>
                      {errors.email && errors.email.message}
                    </FormErrorMessage>
                  </FormControl>
                  <PasswordField
                    isinvalid={errors.password}
                    errorsmessage={errors.password && errors.password.message}
                    name="password"
                    label="Password"
                    {...register('password', {
                      required: 'Password is required',
                      minLength: {
                        value: 8,
                        message: 'Minimum length should be 8',
                      },
                    })}
                  />
                  {isSignup && (
                    <>
                      <PasswordField
                        isinvalid={errors.confirmPassword}
                        errorsmessage={
                          errors.confirmPassword &&
                          errors.confirmPassword.message
                        }
                        name="confirmPassword"
                        label="Repeat Password"
                        {...register('confirmPassword', {
                          required: 'Repeat Password is required',
                          validate: val => {
                            if (watch('password') !== val) {
                              return 'Your passwords do no match';
                            }
                          },
                        })}
                      />

                      <FormControl isInvalid={errors.first_name}>
                        <FormLabel htmlFor="first_name">First Name</FormLabel>
                        <Input
                          name="first_name"
                          {...register('first_name', {
                            required: 'First Name is required',
                            minLength: {
                              value: 3,
                              message: 'Minimum length should be 3',
                            },
                          })}
                        />
                        <FormErrorMessage>
                          {errors.first_name && errors.first_name.message}
                        </FormErrorMessage>
                      </FormControl>
                      <FormControl isInvalid={errors.last_name}>
                        <FormLabel htmlFor="last_name">Last Name</FormLabel>
                        <Input
                          name="last_name"
                          {...register('last_name', {
                            required: 'Last Name is required',
                            minLength: {
                              value: 3,
                              message: 'Minimum length should be 3',
                            },
                          })}
                        />
                        <FormErrorMessage>
                          {errors.last_name && errors.last_name.message}
                        </FormErrorMessage>
                      </FormControl>
                    </>
                  )}
                </Stack>

                <Stack spacing="6">
                  <Button
                    colorScheme="facebook"
                    isLoading={isSubmitting}
                    type="submit"
                  >
                    {isSignup ? 'Sign Up' : 'Sign In'}
                  </Button>
                  <HStack justify="end">
                    <Button
                      variant="link"
                      colorScheme="blue"
                      onClick={switchMode}
                    >
                      {isSignup
                        ? 'Already have an account? Sign in'
                        : "Don't have an account? Sign Up"}
                    </Button>
                  </HStack>
                </Stack>
              </Stack>
            </form>
          </Box>
        </Stack>
      </Container>
    </ScaleFade>
  );
};

export default Auth;
