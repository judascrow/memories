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
  Divider,
} from '@chakra-ui/react';
import { BiLike } from 'react-icons/bi';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const Post = ({ post, setCurrentId }) => {
  const user = JSON.parse(localStorage.getItem('profile'));

  const navigate = useNavigate();
  // const [likes, setLikes] = useState(post?.likes);
  const [likes] = useState(post?.likes);

  const userId = user?.result?._id;

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

  const openPost = e => {
    navigate(`/posts/${post.id}`);
  };

  return (
    <>
      <Center>
        <Flex
          direction={'column'}
          justify="space-between"
          // maxW="445px"
          w="'full"
          bg={useColorModeValue('white', 'gray.900')}
          boxShadow="2xl"
          rounded="md"
          overflow="hidden"
        >
          <Flex
            as="button"
            w="100%"
            bg={useColorModeValue('gray.500', 'gray.600')}
            h={{ base: '250px', md: '180px', lg: '180px' }}
            position="relative"
            bgPosition="center"
            bgSize="cover"
            bgImage={post.selectedFile}
            borderTopRadius="md"
            direction="column"
            onClick={openPost}
          >
            <Box p={2}>
              <Text color="white" fontSize="sm" textAlign={'start'}>
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
              <Text
                color={useColorModeValue('gray.500', 'white')}
                fontSize="xs"
              >
                {post.message.slice(0, 100)}...
              </Text>
            </Stack>
          </Box>
        </Flex>
      </Center>
      <Divider />
      <Flex direction={'row'} p={3} justify={{ base: 'center', md: 'start' }}>
        <Button
          size="xs"
          color={useColorModeValue('blue.600', 'white')}
          leftIcon={<Likes />}
        />
      </Flex>
    </>
  );
};

export default Post;
