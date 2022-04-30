import React from 'react';
import { Box } from '@chakra-ui/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Pagination, PaginationItem } from '@mui/material';

const themeMUI = createTheme();

const sx = {
  ul: {
    justifyContent: 'space-around',
  },
};

const Paginate = ({ page }) => {
  return (
    <Box p={3}>
      <ThemeProvider theme={themeMUI}>
        <Pagination
          sx={sx}
          count={3}
          // page={Number(page) || 1}
          size="small"
          color="primary"
          variant="outlined"
          renderItem={item => (
            <PaginationItem
              {...item}
              // component={Link}
              to={`/posts?page=${item.page}`}
            />
          )}
        />
      </ThemeProvider>
    </Box>
  );
};

export default Paginate;
