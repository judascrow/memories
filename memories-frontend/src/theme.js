import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const theme = extendTheme({
  fonts: {
    heading: 'Open Sans, sans-serif',
    body: 'Raleway, sans-serif',
  },
  styles: {
    global: props => ({
      body: {
        bg: mode('gray.50', 'blackAlpha.900')(props),
      },
    }),
  },
});

export default theme;
