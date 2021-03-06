import { useEffect, useState } from 'react';
import {
  Box,
  useColorModeValue,
  ScaleFade,
  CircularProgress,
  Heading,
  Text,
  Image,
  Tag,
  Divider,
  Spacer,
  Flex,
  useMediaQuery,
  Container,
  Button,
} from '@chakra-ui/react';
import { AiOutlineLike, AiFillLike } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams } from 'react-router-dom';

import { getPost, likePost } from '../../actions/posts';
import CommentSection from './CommentSection';

const PostDetails = () => {
  const bg = useColorModeValue('white', 'gray.700');
  const colorText = useColorModeValue('gray.600', 'white');
  const colorTag = useColorModeValue('gray.500', 'white');
  const colorLike = useColorModeValue('blue.600', 'white');
  const [isLargerThan1280] = useMediaQuery('(min-width: 960px)');
  const user = JSON.parse(localStorage.getItem('profile'));
  const { post, isLoading } = useSelector(state => state.posts);

  const dispatch = useDispatch();
  const { id } = useParams();

  const [likes, setLikes] = useState(post?.likes);

  const userId = user?.result?.id;
  const hasLikedPost = likes?.find(like => like === userId);

  useEffect(() => {
    setLikes(post?.likes);
    // eslint-disable-next-line
  }, [post]);

  useEffect(() => {
    dispatch(getPost(id));
    // eslint-disable-next-line
  }, [id]);

  if (!post) return null;

  const handleLike = async () => {
    dispatch(likePost(post.id));

    if (hasLikedPost) {
      setLikes(likes?.filter(like => like !== userId));
    } else {
      setLikes([...likes, userId]);
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

  if (isLoading) {
    return (
      <ScaleFade in>
        <Flex mx={{ base: 4, md: 12 }} bg={bg} shadow="md" rounded="md" p={3}>
          <CircularProgress isIndeterminate />
        </Flex>
      </ScaleFade>
    );
  }

  return (
    <ScaleFade in>
      <Flex
        bg={bg}
        shadow="md"
        rounded="md"
        mx={{ base: 4, md: 12 }}
        direction={{ base: 'column', md: 'row' }}
        mb={5}
      >
        <Flex direction={'column'} flex={1} p={5} order={{ base: 2, md: 1 }}>
          <Heading size="lg" color={colorText} mb={2}>
            {post.title}
          </Heading>
          <Box mb={5}>
            {post.tags.map((tag, index) => (
              <Tag key={index} size="sm" mr={1} color={colorTag}>
                {tag}
              </Tag>
            ))}
          </Box>
          <Box mb={10}>
            <Text fontSize="sm">{post.message}</Text>
          </Box>

          <Box mb={2}>
            <Text color={colorText} fontSize="sm">
              Created by: {post.user.first_name + ' ' + post.user.last_name}
            </Text>
          </Box>
          <Box mb={3}>
            <Text color={colorText} fontSize="xs">
              {moment(post.created_at).fromNow()}
            </Text>
          </Box>
          <Box mb={3}>
            <Button
              size="xs"
              color={colorLike}
              leftIcon={<Likes />}
              disabled={!user?.result}
              onClick={handleLike}
            />
          </Box>
          <Divider mb={5} />
          <CommentSection post={post} />
        </Flex>

        <Flex flex={1} p={5} order={{ base: 1, md: 2 }}>
          {isLargerThan1280 ? (
            <>
              <Spacer />
              <Image
                src={post.image}
                objectFit="cover"
                rounded="md"
                fallbackSrc="https://lpm.ulm.ac.id/image/desain/empty.jpg"
              />
            </>
          ) : (
            <Container centerContent px={0}>
              <Image
                src={post.image}
                objectFit="cover"
                rounded="md"
                fallbackSrc="https://lpm.ulm.ac.id/image/desain/empty.jpg"
              />
            </Container>
          )}
        </Flex>
      </Flex>
      {/* <Grid
        templateColumns="repeat(12, 1fr)"
        gap={4}
        mx={{ base: 4, md: 12 }}
        bg={bg}
        shadow="md"
        rounded="md"
      >
        <GridItem colSpan={{ base: 12, md: 6 }} w="100%" p={5}>
          <Grid templateColumns="repeat(12, 1fr)" gap={4}>
            <GridItem colSpan={12} w="100%">
              <Heading size="lg" color="gray.600" mb={2}>
                {post.title}
              </Heading>
              <Box mb={5}>
                {post.tags.map((tag, index) => (
                  <Tag key={index} size="sm" mr={1} color={'gray.500'}>
                    {tag}
                  </Tag>
                ))}
              </Box>
              <Box mb={10}>
                <Text color={'gray.600'} fontSize="sm">
                  {post.message}
                </Text>
              </Box>
              <Box mb={2}>
                <Text color={'gray.600'} fontSize="sm">
                  Created by: {post.name}
                </Text>
              </Box>
              <Box mb={3}>
                <Text color={'gray.600'} fontSize="xs">
                  {moment(post.createdAt).fromNow()}
                </Text>
              </Box>
              <Divider />
            </GridItem>
          </Grid>
        </GridItem>
        <GridItem colSpan={{ base: 12, md: 6 }} w="100%" p={3}>
          <Grid templateColumns="repeat(12, 1fr)" gap={4}>
            <GridItem colSpan={12} w="100%">
              <Image src={post.selectedFile} objectFit="cover" />
            </GridItem>
          </Grid>
        </GridItem>
      </Grid> */}
    </ScaleFade>
  );
};

export default PostDetails;
