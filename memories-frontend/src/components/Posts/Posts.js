import { Grid, GridItem, useColorModeValue } from '@chakra-ui/react';
import Post from './Post';

const Posts = () => {
  return (
    <Grid
      templateColumns={{
        base: 'repeat(1, 1fr)',
        md: 'repeat(2, 1fr)',
        lg: 'repeat(4, 1fr)',
      }}
      gap={4}
    >
      <GridItem
        colSpan={1}
        w="100%"
        bg={useColorModeValue('white', 'gray.700')}
        shadow="md"
        rounded="md"
      >
        <Post />
      </GridItem>
      <GridItem
        colSpan={1}
        w="100%"
        bg={useColorModeValue('white', 'gray.700')}
        shadow="md"
        rounded="md"
      >
        <Post />
      </GridItem>
      <GridItem
        colSpan={1}
        w="100%"
        bg={useColorModeValue('white', 'gray.700')}
        shadow="md"
        rounded="md"
      >
        <Post />
      </GridItem>
      <GridItem
        colSpan={1}
        w="100%"
        bg={useColorModeValue('white', 'gray.700')}
        shadow="md"
        rounded="md"
      >
        <Post />
      </GridItem>
      <GridItem
        colSpan={1}
        w="100%"
        bg={useColorModeValue('white', 'gray.700')}
        shadow="md"
        rounded="md"
      >
        <Post />
      </GridItem>
      <GridItem
        colSpan={1}
        w="100%"
        bg={useColorModeValue('white', 'gray.700')}
        shadow="md"
        rounded="md"
      >
        <Post />
      </GridItem>
      <GridItem
        colSpan={1}
        w="100%"
        bg={useColorModeValue('white', 'gray.700')}
        shadow="md"
        rounded="md"
      >
        <Post />
      </GridItem>
      <GridItem
        colSpan={1}
        w="100%"
        bg={useColorModeValue('white', 'gray.700')}
        shadow="md"
        rounded="md"
      >
        <Post />
      </GridItem>
    </Grid>
  );
};

export default Posts;
