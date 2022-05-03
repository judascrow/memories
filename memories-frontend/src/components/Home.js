// import Search from './Search';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Grid,
  GridItem,
  useColorModeValue,
  Input,
  Button,
} from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';

import Form from './Form';
import Pagination from './Pagination';
import Posts from './Posts/Posts';
import { getPostsBySearch } from '../actions/posts';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const query = useQuery();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');

  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();

  const searchPost = () => {
    if (search.trim() || tags) {
      dispatch(getPostsBySearch({ search, tags: tags.join(',') }));

      if (tags.length === 0) {
        navigate(`/posts?search=${search}`);
      } else {
        navigate(`/posts?search=${search || 'none'}&tags=${tags.join(',')}`);
      }
    } else {
      navigate('/');
    }
  };

  const handleKeyPress = e => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  return (
    <Grid templateColumns="repeat(12, 1fr)" gap={4} mx={{ base: 4, md: 12 }}>
      <GridItem
        colSpan={{ base: 12, md: 8, lg: 9 }}
        w="100%"
        order={{ base: 2, md: 1 }}
      >
        <Posts setCurrentId={setCurrentId} />
      </GridItem>
      <GridItem
        colSpan={{ base: 12, md: 4, lg: 3 }}
        w="100%"
        // bg="blue.500"
        order={{ base: 1, md: 2 }}
      >
        <Grid templateColumns="repeat(1, 1fr)" gap={4}>
          <GridItem
            w="100%"
            bg={useColorModeValue('white', 'gray.700')}
            shadow="md"
            rounded="md"
            p={3}
          >
            <Input
              size="sm"
              placeholder="Search Memories"
              mb={2}
              onKeyDown={handleKeyPress}
              defaultValue={search}
              onChange={e => setSearch(e.target.value)}
            />
            <Input
              size="sm"
              placeholder="Search Tags"
              mb={2}
              defaultValue={tags}
            />
            <Button
              size="sm"
              colorScheme="facebook"
              w="100%"
              leftIcon={<FaSearch />}
              onClick={searchPost}
            >
              SEARCH
            </Button>
          </GridItem>
          <GridItem
            w="100%"
            bg={useColorModeValue('white', 'gray.700')}
            shadow="md"
            rounded="md"
          >
            <Form />
          </GridItem>
          <GridItem
            w="100%"
            bg={useColorModeValue('white', 'gray.700')}
            shadow="md"
            rounded="md"
          >
            {!searchQuery && !tags.length && <Pagination page={page} />}
          </GridItem>
        </Grid>
      </GridItem>
    </Grid>
  );
};

export default Home;
