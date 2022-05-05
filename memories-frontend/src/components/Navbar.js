import { useState, useEffect } from 'react';
import {
  Flex,
  Center,
  Heading,
  Button,
  useColorModeValue,
  Icon,
  Spacer,
  Avatar,
  Show,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import decode from 'jwt-decode';
import { FaCameraRetro, FaLock } from 'react-icons/fa';

import * as actionType from '../constants/actionTypes';
import { ColorModeSwitcher } from '../ColorModeSwitcher';

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });

    navigate('/auth');

    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
    // eslint-disable-next-line
  }, [location]);

  return (
    <Flex
      bg={useColorModeValue('white', 'gray.700')}
      m={4}
      px={{ base: 4, md: 10 }}
      py={4}
      justify="start"
      rounded="md"
      shadow="md"
      direction={{ base: 'column', md: 'row' }}
    >
      <Center mb={{ base: 4, md: 0 }}>
        <Center as={Link} to="/">
          <Heading mr={2} color={useColorModeValue('gray.600', 'white')}>
            Memories
          </Heading>
          <Icon
            as={FaCameraRetro}
            w={8}
            h={8}
            color={useColorModeValue('blue.600', 'white')}
          />
        </Center>
        <Show below="md">
          <ColorModeSwitcher />
        </Show>
      </Center>

      <Spacer />
      {user?.result ? (
        <Center>
          <Avatar size="sm" bg="purple.500" mr={5} />
          <Heading fontSize="sm" color="gray.600" mr={10}>
            Thongchai Somtua
          </Heading>
          <Spacer />
          <Button colorScheme="pink" size="sm" onClick={logout}>
            LOGOUT
          </Button>
        </Center>
      ) : (
        <Center>
          <Button
            as={Link}
            to="/auth"
            size="sm"
            colorScheme="pink"
            w="100%"
            leftIcon={<FaLock />}
          >
            Sign In
          </Button>
        </Center>
      )}
      <Show above="md">
        <ColorModeSwitcher />
      </Show>
    </Flex>
  );
};

export default Navbar;
