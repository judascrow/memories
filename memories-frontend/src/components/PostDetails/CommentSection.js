import { useState, useRef } from 'react';
import {
  Flex,
  Heading,
  Text,
  Textarea,
  Button,
  useColorModeValue,
  Icon,
  Link,
  Grid,
  GridItem,
  Tooltip,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { TiDelete } from 'react-icons/ti';
import moment from 'moment';

import Alert from '../Alert';
import { commentPost, deleteComment } from '../../actions/posts';

const CommentSection = ({ post }) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const colorText = useColorModeValue('gray.600', 'whiteAlpha.900');
  const dispatch = useDispatch();
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState(post?.comments);
  const commentsRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const [CID, setCID] = useState(null);
  const toast = useToast();

  const userId = user?.result?.id;

  const handleComment = async () => {
    const newComments = await dispatch(commentPost(comment, post.id));

    setComment('');
    setComments(newComments);

    commentsRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSetDelComment = async commentID => {
    await setCID(commentID);
    onOpen();
  };

  const handleDeleteComment = async (postID, commentID) => {
    const listComments = await dispatch(
      deleteComment(postID, commentID, toast)
    );
    onClose();
    setComments(listComments.filter(c => c.id !== c.commentID));
    commentsRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Flex direction={{ base: 'column', lg: 'row' }}>
      <Flex
        direction={'column'}
        flex={1}
        p={3}
        order={{ base: 2, lg: 1 }}
        bgColor="blackAlpha.50"
        // w={{ md: '100%' }}
      >
        <Heading fontSize="sm" mb={2} color={colorText}>
          Comments
        </Heading>
        {comments?.map((c, i) => (
          <Grid key={i} templateColumns="repeat(12, 1fr)">
            <GridItem colSpan={11}>
              <Tooltip
                hasArrow
                label={moment(c.created_at).fromNow()}
                bg="gray.300"
                color="black"
                fontSize={'12px'}
              >
                <Text key={i} color={colorText} fontSize="xs">
                  <strong>{c.comment_text.split(': ')[0]}: </strong>
                  {c.comment_text.split(':')[1]}{' '}
                </Text>
              </Tooltip>
            </GridItem>
            <GridItem colSpan={1}>
              <Text fontSize="xs" align="right">
                {c.user_id === userId ? (
                  <Link onClick={() => handleSetDelComment(c.id)}>
                    <Icon as={TiDelete} w={4} h={4} color="red.300" />
                  </Link>
                ) : (
                  ''
                )}
              </Text>
            </GridItem>
          </Grid>
        ))}

        <div ref={commentsRef} />
      </Flex>

      {!user?.result?.name ? (
        <Flex direction={'column'} flex={1} p={3} order={{ base: 1, lg: 2 }}>
          <Heading fontSize="sm" mb={2} color={colorText}>
            Please Sign In to Comment
          </Heading>
        </Flex>
      ) : (
        <Flex direction={'column'} flex={1} p={3} order={{ base: 1, lg: 2 }}>
          <Heading fontSize="sm" mb={2} color={colorText}>
            Write a comment
          </Heading>
          <Textarea
            size="sm"
            mb={2}
            value={comment}
            onChange={e => setComment(e.target.value)}
          />
          <Button
            size="sm"
            colorScheme="facebook"
            w="100%"
            disabled={!comment.length}
            onClick={handleComment}
          >
            COMMENT
          </Button>
        </Flex>
      )}
      <Alert
        isOpen={isOpen}
        cancelRef={cancelRef}
        onClose={onClose}
        postID={post?.id}
        commentID={CID}
        handleFuc={handleDeleteComment}
      />
    </Flex>
  );
};

export default CommentSection;
