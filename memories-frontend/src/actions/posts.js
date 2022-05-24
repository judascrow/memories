import {
  START_LOADING,
  END_LOADING,
  FETCH_ALL,
  FETCH_POST,
  ERROR_NOT_FOUND,
} from '../constants/actionTypes';
import * as api from '../api/index.js';

export const getPost = id => async dispatch => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.fetchPost(id);

    dispatch({ type: FETCH_POST, payload: { post: data } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
    dispatch({ type: ERROR_NOT_FOUND });
    dispatch({ type: END_LOADING });
  }
};

export const getPosts = (page, searchQuery) => async dispatch => {
  try {
    dispatch({ type: START_LOADING });
    const {
      data: { data, currentPage, numberOfPages },
    } = await api.fetchPosts(page, searchQuery);

    dispatch({
      type: FETCH_ALL,
      payload: { data, currentPage, numberOfPages },
    });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
    dispatch({ type: ERROR_NOT_FOUND });
    dispatch({ type: END_LOADING });
  }
};
