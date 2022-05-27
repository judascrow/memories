import { useState } from 'react';
import moment from 'moment';
import {
  Box,
  Heading,
  Text,
  Stack,
  useColorModeValue,
  Tag,
  Flex,
  Button,
  Divider,
} from '@chakra-ui/react';
import { AiOutlineLike, AiFillLike } from 'react-icons/ai';
import { FiMoreHorizontal } from 'react-icons/fi';
import { MdDeleteForever } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { likePost, deletePost } from '../../actions/posts';

const Post = ({ post, setCurrentId }) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [likes, setLikes] = useState(post?.likes);

  const userId = user?.result?.id;
  const hasLikedPost = post?.likes?.find(like => like === userId);

  const handleLike = async () => {
    dispatch(likePost(post.id));

    if (hasLikedPost) {
      setLikes(post?.likes?.filter(like => like !== userId));
    } else {
      setLikes([...post.likes, userId]);
    }
  };

  const Likes = () => {
    if (likes && likes.length > 0) {
      return likes.find(like => like === userId) ? (
        <>
          <AiFillLike fontSize="small" />
          &nbsp;
          {likes.length > 2
            ? `You and ${likes.length - 1} others`
            : `${likes.length} Like${likes.length > 1 ? 's' : ''}`}
        </>
      ) : (
        <>
          <AiOutlineLike fontSize="small" />
          &nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}
        </>
      );
    }

    return (
      <>
        <AiOutlineLike fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  const openPost = e => {
    navigate(`/posts/${post.id}`);
  };

  return (
    <>
      {/* <Center> */}
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
          bgImage={post.image}
          borderTopRadius="md"
          direction="column"
          onClick={openPost}
          // style={{ filter: 'brightness(0.6)' }}
        >
          <Flex
            flexDirection={'column'}
            w="100%"
            p={2}
            justifyContent="flex-start"
          >
            <Flex justifyContent={'space-between'}>
              <Text color="white" fontSize="sm" textAlign={'start'}>
                {post.creator}
              </Text>
              {user?.result?.id === post?.user_id && (
                <Box name="edit">
                  <Box
                    onClick={e => {
                      e.stopPropagation();
                      setCurrentId(post.id);
                      window.scrollTo({
                        top: 0,
                        behavior: 'smooth',
                      });
                    }}
                    px={1}
                    borderRadius="2px"
                    bgColor="whiteAlpha.700"
                    color="#4b4f56"
                    _hover={{ bg: '#ebedf0' }}
                    _active={{
                      bg: '#dddfe2',
                      transform: 'scale(0.98)',
                      borderColor: '#bec3c9',
                    }}
                    _focus={{
                      boxShadow:
                        '0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)',
                    }}
                  >
                    <FiMoreHorizontal />
                  </Box>
                </Box>
              )}
            </Flex>

            <Text color="white" fontSize="xs" align={'start'}>
              {moment(post.created_at).fromNow()}
            </Text>
          </Flex>
        </Flex>
        <Box p={3}>
          <Box mb={3}>
            {post.tags?.length > 0 ? (
              post.tags.map((tag, index) => (
                <Tag key={index} size="sm" mr={1}>
                  {tag}
                </Tag>
              ))
            ) : (
              <Text fontSize="xs" mb={5} color="gray.500">
                no tag
              </Text>
            )}
          </Box>
          <Stack>
            <Heading
              color={useColorModeValue('gray.700', 'white')}
              fontSize={'lg'}
              fontFamily={'body'}
            >
              {post.title}
            </Heading>
            <Text color={useColorModeValue('gray.500', 'white')} fontSize="xs">
              {post.message.slice(0, 100)}...
            </Text>
          </Stack>
        </Box>
      </Flex>
      {/* </Center> */}
      <Divider />
      <Flex
        direction={'row'}
        p={3}
        justify={{ base: 'center', md: 'start' }}
        justifyContent="space-between"
      >
        <Button
          size="xs"
          w={{ base: '100%', md: '40%' }}
          color={useColorModeValue('blue.600', 'white')}
          leftIcon={<Likes />}
          disabled={!user?.result}
          onClick={handleLike}
          mr={1}
        />
        {user?.result?.id === post?.user_id && (
          <Button
            size="xs"
            w={{ base: '100%', md: '40%' }}
            leftIcon={<MdDeleteForever />}
            color="red.500"
            onClick={() => {
              dispatch(deletePost(post.id));
            }}
            ml={1}
          >
            Delete
          </Button>
        )}
      </Flex>
    </>
  );
};

export default Post;
