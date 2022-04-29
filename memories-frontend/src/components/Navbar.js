import {
  Flex,
  Center,
  Heading,
  Button,
  useColorModeValue,
  Icon,
  Spacer,
  Avatar,
} from '@chakra-ui/react';
import { FaCameraRetro } from 'react-icons/fa';

const Navbar = () => {
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
        <Heading mr={2} color="gray.600">
          Memories
        </Heading>
        <Icon as={FaCameraRetro} w={8} h={8} color="blue.600" />
      </Center>
      <Spacer />
      <Center>
        <Avatar size="sm" bg="purple.500" mr={5} />
        <Heading fontSize="sm" color="gray.600" mr={10}>
          Thongchai Somtua
        </Heading>
        <Spacer />
        <Button colorScheme="pink" size="sm">
          LOGOUT
        </Button>
      </Center>
    </Flex>
  );
};

export default Navbar;
