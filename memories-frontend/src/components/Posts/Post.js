import { Box, Image } from '@chakra-ui/react';

const Post = () => {
  return (
    <Box as="button" h="100%" w="100%">
      <Image
        src="https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
        h={0}
        pt="56.25%"
      ></Image>
    </Box>
  );
};

export default Post;
