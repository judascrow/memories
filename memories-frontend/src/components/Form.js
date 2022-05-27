import {
  Box,
  Heading,
  Input,
  Textarea,
  Button,
  Image,
  useColorModeValue,
  FormControl,
  FormErrorMessage,
  Center,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import { useForm } from 'react-hook-form';

import { createPost, updatePost } from '../actions/posts';
import { useEffect } from 'react';

const Form = ({ currentId, setCurrentId }) => {
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  const colorText = useColorModeValue('gray.500', 'gray.300');
  const user = JSON.parse(localStorage.getItem('profile'));
  const post = useSelector(state =>
    currentId
      ? state.posts.posts.find(message => message.id === currentId)
      : null
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const clear = () => {
    setCurrentId(0);
    reset();
  };

  useEffect(() => {
    if (!post?.title) clear();
    if (post) {
      setValue('title', post.title);
      setValue('message', post.message);
      setValue('tags', post.tags);
      setValue('image', 'C:UsersCOJDesktop\test.png');
    }
    // eslint-disable-next-line
  }, [post]);

  if (!user?.result?.name) {
    return (
      <Box p={5}>
        <Heading size="sm" align="center" color={colorText}>
          Please Sign In to create your own memories and like other's memories.
        </Heading>
      </Box>
    );
  }

  const onSubmit = async fromData => {
    const fmData = new FormData();
    for (const key in fromData) {
      if (key === 'image') {
        if (fromData[key][0] !== undefined) {
          fmData.append(key, fromData[key][0]);
        }
      } else {
        fmData.append(key, fromData[key]);
      }
    }

    if (currentId === 0) {
      dispatch(createPost(fmData, navigate));
    } else {
      dispatch(updatePost(currentId, fmData));
    }

    clear();
  };

  return (
    <Box p={3}>
      <form autoComplete="off" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Heading fontSize="sm" color="gray.500" align="center" mb={2}>
          {currentId ? `Editing "${post?.title}"` : 'Creating a Memory'}
        </Heading>
        <FormControl isInvalid={errors.title} mb={2}>
          <Input
            name="title"
            size="sm"
            placeholder="Title"
            {...register('title', {
              required: 'Title is required',
            })}
          />
          <FormErrorMessage>
            {errors.title && errors.title.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.message} mb={2}>
          <Textarea
            name="message"
            size="sm"
            placeholder="Message"
            {...register('message', {
              required: 'Message is required',
            })}
          />
          <FormErrorMessage>
            {errors.message && errors.message.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.tags} mb={2}>
          <Input
            name="tags"
            size="sm"
            placeholder="Tags (coma separated)"
            {...register('tags')}
          />
          <FormErrorMessage>
            {errors.tags && errors.tags.message}
          </FormErrorMessage>
        </FormControl>
        {post?.image ? (
          <Center mb={2}>
            <Image rounded="md" objectFit="cover" src={post?.image}></Image>
          </Center>
        ) : (
          ''
        )}

        <FormControl isInvalid={errors.image} mb={2}>
          <Input
            name="image"
            type="file"
            size="sm"
            border={0}
            px={0}
            {...register('image')}
          />

          <FormErrorMessage>
            {errors.image && errors.image.message}
          </FormErrorMessage>
        </FormControl>
        <Button
          isLoading={isSubmitting}
          type="submit"
          size="sm"
          colorScheme="facebook"
          w="100%"
          leftIcon={<FaPlus />}
          mb={2}
        >
          SUBMIT
        </Button>
        <Button colorScheme="gray" size="sm" w="100%" onClick={clear}>
          Clear
        </Button>
      </form>
    </Box>
  );
};

export default Form;
