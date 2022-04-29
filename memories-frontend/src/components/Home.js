import { Grid, GridItem, useColorModeValue } from '@chakra-ui/react';
import Search from './Search';
import Form from './Form';
import Pagination from './Pagination';

const Home = () => {
  return (
    <Grid templateColumns="repeat(12, 1fr)" gap={4} mx={{ base: 4, md: 12 }}>
      <GridItem
        colSpan={{ base: 12, md: 8, lg: 9 }}
        w="100%"
        bg="blue.500"
        order={{ base: 2, md: 1 }}
      >
        <Grid
          templateColumns={{
            base: 'repeat(1, 1fr)',
            md: 'repeat(2, 1fr)',
            lg: 'repeat(4, 1fr)',
          }}
          gap={4}
        >
          <GridItem colSpan={1} w="100%" p={4} bg="red.500">
            POSTS
          </GridItem>
          <GridItem colSpan={1} w="100%" p={4} bg="red.500">
            POSTS
          </GridItem>
          <GridItem colSpan={1} w="100%" p={4} bg="red.500">
            POSTS
          </GridItem>
          <GridItem colSpan={1} w="100%" p={4} bg="red.500">
            POSTS
          </GridItem>
          <GridItem colSpan={1} w="100%" p={4} bg="red.500">
            POSTS
          </GridItem>
          <GridItem colSpan={1} w="100%" p={4} bg="red.500">
            POSTS
          </GridItem>
          <GridItem colSpan={1} w="100%" p={4} bg="red.500">
            POSTS
          </GridItem>
          <GridItem colSpan={1} w="100%" p={4} bg="red.500">
            POSTS
          </GridItem>
        </Grid>
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
          >
            <Search />
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
            <Pagination page={1} />
          </GridItem>
        </Grid>
      </GridItem>
    </Grid>
  );
};

export default Home;
