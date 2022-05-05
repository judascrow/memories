import { useState, useRef } from 'react';
import {
  Flex,
  Heading,
  Text,
  Textarea,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';

const CommentSection = ({ post }) => {
  const colorText = useColorModeValue('gray.600', 'whiteAlpha.900');
  const user = JSON.parse(localStorage.getItem('profile'));

  const [comments] = useState(post?.comments);
  const commentsRef = useRef();

  return (
    <Flex direction={{ base: 'column', md: 'row' }}>
      <Flex
        direction={'column'}
        flex={1}
        p={3}
        order={{ base: 2, md: 1 }}
        bgColor="blackAlpha.50"
      >
        <Heading fontSize="sm" mb={2} color={colorText}>
          Comments
        </Heading>
        {comments?.map((c, i) => (
          <Text key={i} color={colorText} fontSize="xs">
            <strong>{c.split(': ')[0]}: </strong>
            {c.split(':')[1]}
          </Text>
        ))}
        <div ref={commentsRef} />
      </Flex>

      {!user?.result?.name ? (
        <Flex direction={'column'} flex={1} p={3} order={{ base: 1, md: 2 }}>
          <Heading fontSize="sm" mb={2} color={colorText}>
            Please Sign In to Comment
          </Heading>
        </Flex>
      ) : (
        <Flex direction={'column'} flex={1} p={3} order={{ base: 1, md: 2 }}>
          <Heading fontSize="sm" mb={2} color={colorText}>
            Write a comment
          </Heading>
          <Textarea size="sm" mb={2} />
          <Button size="sm" colorScheme="facebook" w="100%">
            COMMENT
          </Button>
        </Flex>
      )}
    </Flex>
  );
};

export default CommentSection;
