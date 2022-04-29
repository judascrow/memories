import React from 'react';
import { Center } from '@chakra-ui/react';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import Pagination from '@mui/material/Pagination';
const themeMUI = createTheme();

const Paginate = ({ page }) => {
  return (
    <Center p={3}>
      <ThemeProvider theme={themeMUI}>
        <Pagination
          count={5}
          // page={Number(page) || 1}
          size="small"
          color="primary"
          variant="outlined"
        />
      </ThemeProvider>
    </Center>
  );
};

export default Paginate;
