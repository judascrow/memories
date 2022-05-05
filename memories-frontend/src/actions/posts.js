import {
  START_LOADING,
  END_LOADING,
  FETCH_ALL,
  FETCH_BY_SEARCH,
  FETCH_POST,
  // CREATE,
  // UPDATE,
  // DELETE,
  // LIKE,
  // COMMENT,
  // FETCH_BY_CREATOR,
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

// export const getPostsByCreator = (name) => async (dispatch) => {
//   try {
//     dispatch({ type: START_LOADING });
//     const { data: { data } } = await api.fetchPostsByCreator(name);

//     dispatch({ type: FETCH_BY_CREATOR, payload: { data } });
//     dispatch({ type: END_LOADING });
//   } catch (error) {
//     console.log(error);
//   }
// };

export const getPostsBySearch = searchQuery => async dispatch => {
  try {
    dispatch({ type: START_LOADING });
    const {
      data: { data, currentPage, numberOfPages },
    } = await api.fetchPostsBySearch(searchQuery);

    dispatch({
      type: FETCH_BY_SEARCH,
      payload: { data, currentPage, numberOfPages },
    });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

// export const createPost = (post, history) => async (dispatch) => {
//   try {
//     dispatch({ type: START_LOADING });
//     const { data } = await api.createPost(post);

//     dispatch({ type: CREATE, payload: data });

//     history.push(`/posts/${data._id}`);
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const updatePost = (id, post) => async (dispatch) => {
//   try {
//     const { data } = await api.updatePost(id, post);

//     dispatch({ type: UPDATE, payload: data });
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const likePost = (id) => async (dispatch) => {
//   const user = JSON.parse(localStorage.getItem('profile'));

//   try {
//     const { data } = await api.likePost(id, user?.token);

//     dispatch({ type: LIKE, payload: data });
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const commentPost = (value, id) => async (dispatch) => {
//   try {
//     const { data } = await api.comment(value, id);

//     dispatch({ type: COMMENT, payload: data });

//     return data.comments;
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const deletePost = (id) => async (dispatch) => {
//   try {
//     await await api.deletePost(id);

//     dispatch({ type: DELETE, payload: id });
//   } catch (error) {
//     console.log(error);
//   }
// };
