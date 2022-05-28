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
  COMMENT,
  DELETE_COMMENT,
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

export const createPost = (post, navigate, toast) => async dispatch => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.createPost(post);

    dispatch({ type: CREATE, payload: data.data });

    toast({
      title: data.message,
      status: 'success',
      position: 'top',
      duration: 3000,
      isClosable: true,
    });

    navigate(`/posts/${data.data.id}`);
  } catch (error) {
    console.log(error);
    dispatch({ type: ERROR_NOT_FOUND });
    dispatch({ type: END_LOADING });
    toast({
      title: error.response.data ? error.response.data.message : error.message,
      status: 'error',
      position: 'top',
      duration: 3000,
      isClosable: true,
    });
  }
};

export const updatePost = (id, post, toast) => async dispatch => {
  try {
    const { data } = await api.updatePost(id, post);

    dispatch({ type: UPDATE, payload: data.data });

    toast({
      title: data.message,
      status: 'success',
      position: 'top',
      duration: 3000,
      isClosable: true,
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: ERROR_NOT_FOUND });
    dispatch({ type: END_LOADING });
    toast({
      title: error.response.data ? error.response.data.message : error.message,
      status: 'error',
      position: 'top',
      duration: 3000,
      isClosable: true,
    });
  }
};

export const deletePost = (id, toast) => async dispatch => {
  try {
    const { data } = await api.deletePost(id);

    dispatch({ type: DELETE, payload: id });

    toast({
      title: data.message,
      status: 'success',
      position: 'top',
      duration: 3000,
      isClosable: true,
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: ERROR_NOT_FOUND });
    dispatch({ type: END_LOADING });
    toast({
      title: error.response.data ? error.response.data.message : error.message,
      status: 'error',
      position: 'top',
      duration: 3000,
      isClosable: true,
    });
  }
};

export const likePost = id => async dispatch => {
  try {
    const { data } = await api.likePost(id);

    dispatch({ type: LIKE, payload: data.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: ERROR_NOT_FOUND });
    dispatch({ type: END_LOADING });
  }
};

export const commentPost = (commentText, id) => async dispatch => {
  try {
    const { data } = await api.commentPost(id, commentText);

    dispatch({ type: COMMENT, payload: data.data });

    return data.data.comments;
  } catch (error) {
    console.log(error);
    dispatch({ type: ERROR_NOT_FOUND });
    dispatch({ type: END_LOADING });
  }
};

export const deleteComment = (id, commentID, toast) => async dispatch => {
  try {
    const { data } = await api.deleteComment(id, commentID);

    dispatch({ type: DELETE_COMMENT, payload: commentID });

    toast({
      title: data.message,
      status: 'success',
      position: 'top',
      duration: 3000,
      isClosable: true,
    });

    return data.data.comments;
  } catch (error) {
    console.log(error);
    dispatch({ type: ERROR_NOT_FOUND });
    dispatch({ type: END_LOADING });
  }
};
