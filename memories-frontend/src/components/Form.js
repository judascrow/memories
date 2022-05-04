import { Box, Heading, Input, Textarea, Button } from '@chakra-ui/react';
import { FaPlus } from 'react-icons/fa';

const Form = ({ currentId, setCurrentId }) => {
  const user = JSON.parse(localStorage.getItem('profile'));

  if (!user?.result?.name) {
    return (
      <Box p={5}>
        <Heading size="sm" align="center" color="gray.500">
          Please Sign In to create your own memories and like other's memories.
        </Heading>
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Heading fontSize="sm" color="gray.500" align="center" mb={2}>
        Creating a Memory
      </Heading>
      <Input size="sm" placeholder="Title" mb={2} />
      <Textarea size="sm" placeholder="Message" mb={2} />
      <Input size="sm" placeholder="Tags" mb={2} />
      <Input type="file" size="sm" border={0} mb={2} px={0} />
      <Button size="sm" colorScheme="facebook" w="100%" leftIcon={<FaPlus />}>
        SUBMIT
      </Button>
    </Box>
  );
};

export default Form;
