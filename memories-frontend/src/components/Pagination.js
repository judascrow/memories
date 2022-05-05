import React, { useEffect } from 'react';
import { Box, useColorMode } from '@chakra-ui/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Pagination, PaginationItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPosts } from '../actions/posts';

const sx = {
  ul: {
    justifyContent: 'space-around',
  },
};

const Paginate = ({ page, searchQuery }) => {
  const { colorMode } = useColorMode();
  const themeMUI = createTheme({
    palette: {
      mode: colorMode,
    },
  });

  const { numberOfPages } = useSelector(state => state.posts);
  const dispatch = useDispatch();
  useEffect(() => {
    if (page) {
      dispatch(getPosts(page, searchQuery));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, page]);

  return (
    <Box p={3}>
      <ThemeProvider theme={themeMUI}>
        <Pagination
          sx={sx}
          count={numberOfPages}
          page={Number(page) || 1}
          size="small"
          color="primary"
          variant="outlined"
          renderItem={item => (
            <PaginationItem
              {...item}
              component={Link}
              to={`/posts?search=${
                searchQuery?.search ? searchQuery.search : ''
              }&page=${item.page}`}
            />
          )}
        />
      </ThemeProvider>
    </Box>
  );
};

export default Paginate;
