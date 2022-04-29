import { Box, Input, Button } from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';

const Search = () => {
  return (
    <Box p={3}>
      <Input size="sm" placeholder="Search Memories" mb={2} />
      <Input size="sm" placeholder="Search Tags" mb={2} />
      <Button size="sm" colorScheme="facebook" w="100%" leftIcon={<FaSearch />}>
        SEARCH
      </Button>
    </Box>
  );
};

export default Search;
