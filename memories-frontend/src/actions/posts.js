import {
  START_LOADING,
  END_LOADING,
  FETCH_ALL,
  FETCH_POST,
  ERROR_NOT_FOUND,
  CREATE,
  UPDATE,
  DELETE,
  LIKE,
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

export const createPost = (post, navigate) => async dispatch => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.createPost(post);

    dispatch({ type: CREATE, payload: data.data });

    navigate(`/posts/${data.data.id}`);
  } catch (error) {
    console.log(error);
    dispatch({ type: ERROR_NOT_FOUND });
    dispatch({ type: END_LOADING });
  }
};

export const updatePost = (id, post) => async dispatch => {
  try {
    const { data } = await api.updatePost(id, post);

    dispatch({ type: UPDATE, payload: data.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: ERROR_NOT_FOUND });
    dispatch({ type: END_LOADING });
  }
};

export const deletePost = id => async dispatch => {
  try {
    await api.deletePost(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
    dispatch({ type: ERROR_NOT_FOUND });
    dispatch({ type: END_LOADING });
  }
};

export const likePost = id => async dispatch => {
  const user = JSON.parse(localStorage.getItem('profile'));

  try {
    const { data } = await api.likePost(id, user?.token);

    dispatch({ type: LIKE, payload: data.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: ERROR_NOT_FOUND });
    dispatch({ type: END_LOADING });
  }
};
