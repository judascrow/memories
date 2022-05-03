import React, { useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Pagination, PaginationItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPosts } from '../actions/posts';

const themeMUI = createTheme();

const sx = {
  ul: {
    justifyContent: 'space-around',
  },
};

const Paginate = ({ page }) => {
  const { numberOfPages } = useSelector(state => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    if (page) {
      dispatch(getPosts(page));
    }
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
              to={`/posts?page=${item.page}`}
            />
          )}
        />
      </ThemeProvider>
    </Box>
  );
};

export default Paginate;
