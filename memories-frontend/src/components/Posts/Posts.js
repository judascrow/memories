import {
  Grid,
  useColorModeValue,
  CircularProgress,
  Flex,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';

import Post from './Post';

const Posts = ({ setCurrentId }) => {
  const bgColor = useColorModeValue('white', 'gray.700');

  const { posts, isLoading } = useSelector(state => state.posts);

  if (!posts.length && !isLoading) return 'No posts';

  return isLoading ? (
    <CircularProgress isIndeterminate />
  ) : (
    <Grid
      templateColumns={{
        base: 'repeat(1, 1fr)',
        md: 'repeat(2, 1fr)',
        lg: 'repeat(4, 1fr)',
      }}
      gap={4}
    >
      {posts?.map(post => (
        <Flex
          key={post.id}
          colSpan={1}
          w="100%"
          bg={bgColor}
          shadow="md"
          rounded="md"
          direction={'column'}
          justify="space-between"
        >
          <Post post={post} setCurrentId={setCurrentId} />
        </Flex>
      ))}
    </Grid>
  );
};

export default Posts;
