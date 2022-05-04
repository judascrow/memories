import { useState } from 'react';
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
import moment from 'moment';

const Post = ({ post, setCurrentId }) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  // const [likes, setLikes] = useState(post?.likes);
  const [likes] = useState(post?.likes);

  const userId = user?.result.googleId || user?.result?._id;

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find(like => like === userId) ? (
        <>
          <BiLike fontSize="small" />
          &nbsp;
          {likes.length > 2
            ? `You and ${likes.length - 1} others`
            : `${likes.length} like${likes.length > 1 ? 's' : ''}`}
        </>
      ) : (
        <>
          <BiLike fontSize="small" />
          &nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}
        </>
      );
    }

    return (
      <>
        <BiLike fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  return (
    <Center>
      <Box
        maxW="445px"
        w="'full"
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow="2xl"
        rounded="md"
        // p={2}
        overflow="hidden"
      >
        <Flex
          bg="gray.500"
          h={{ base: '250px', md: '180px', lg: '180px' }}
          position="relative"
          bgPosition="center"
          bgSize="cover"
          bgImage={post.selectedFile}
          borderTopRadius="md"
          direction="column"
        >
          <Box p={2}>
            <Text color="white" fontSize="sm">
              {post.name}
            </Text>
            <Text color="white" fontSize="xs">
              {moment(post.createdAt).fromNow()}
            </Text>
          </Box>
        </Flex>
        <Box p={3}>
          <Box mb={3}>
            {post.tags.map((tag, index) => (
              <Tag key={index} size="sm" mr={1}>
                {tag}
              </Tag>
            ))}
          </Box>
          <Stack>
            <Heading
              color={useColorModeValue('gray.700', 'white')}
              fontSize={'lg'}
              fontFamily={'body'}
            >
              {post.title}
            </Heading>
            <Text color={'gray.500'} fontSize="xs">
              {post.message.split(' ').splice(0, 20).join(' ')}...
            </Text>
          </Stack>

          <Stack mt={3} direction={'row'} spacing={4}>
            <Button size="xs" color="blue.600" leftIcon={<Likes />} />
          </Stack>
        </Box>
      </Box>
    </Center>
  );
};

export default Post;
