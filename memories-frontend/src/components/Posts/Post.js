import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  useColorModeValue,
  Tag,
  Flex,
  Button,
} from '@chakra-ui/react';
import { BiLike } from 'react-icons/bi';

const Post = () => {
  const detailPost =
    'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.';
  return (
    <Center>
      <Box
        maxW={'445px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'md'}
        // p={2}
        overflow={'hidden'}
      >
        <Flex
          bg={'gray.100'}
          h={{ base: '200px', md: '120px', lg: '120px' }}
          position={'relative'}
          bgPosition="center"
          bgSize={'cover'}
          //   bgBlendMode="darken"
          bgImage={
            'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
          }
          direction="column"
        >
          <Box p={2}>
            <Text color="white" fontSize="sm">
              Thongchai
            </Text>
            <Text color="white" fontSize="xs">
              3 hours ago
            </Text>
          </Box>
        </Flex>
        <Box p={3}>
          <Box mb={3}>
            <Tag size="sm" mr={1}>
              bangkok
            </Tag>
            <Tag size="sm" mr={1}>
              bangkok
            </Tag>
            <Tag size="sm" mr={1}>
              bangkok
            </Tag>
          </Box>
          <Stack>
            <Heading
              color={useColorModeValue('gray.700', 'white')}
              fontSize={'lg'}
              fontFamily={'body'}
            >
              Thailand
            </Heading>
            <Text color={'gray.500'} fontSize="xs">
              {detailPost.split(' ').splice(0, 20).join(' ')}...
            </Text>
          </Stack>
          <Stack mt={3} direction={'row'} spacing={4} align={'center'}>
            <Button size="xs" leftIcon={<BiLike />}>
              Like
            </Button>
          </Stack>
        </Box>
      </Box>
    </Center>
  );
};

export default Post;
