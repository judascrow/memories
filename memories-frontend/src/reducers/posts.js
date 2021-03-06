import {
  FETCH_ALL,
  FETCH_BY_SEARCH,
  FETCH_BY_CREATOR,
  FETCH_POST,
  CREATE,
  UPDATE,
  DELETE,
  LIKE,
  COMMENT,
  ERROR_NOT_FOUND,
  DELETE_COMMENT,
} from '../constants/actionTypes';

// eslint-disable-next-line
export default (state = { isLoading: true, posts: [] }, action) => {
  switch (action.type) {
    case 'START_LOADING':
      return { ...state, isLoading: true };
    case 'END_LOADING':
      return { ...state, isLoading: false };
    case FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case FETCH_BY_SEARCH:
    case FETCH_BY_CREATOR:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case FETCH_POST:
      return { ...state, post: action.payload.post };
    case LIKE:
      return {
        ...state,
        posts: state.posts.map(post =>
          post.id === action.payload.id ? action.payload : post
        ),
      };
    case COMMENT:
      return {
        ...state,
        posts: state.posts.map(post => {
          if (post.id === +action.payload.id) {
            return action.payload;
          }
          return post;
        }),
      };
    case CREATE:
      return { ...state, posts: [...state.posts, action.payload] };
    case UPDATE:
      return {
        ...state,
        posts: state.posts.map(post =>
          post.id === action.payload.id ? action.payload : post
        ),
      };
    case DELETE:
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.payload),
      };
    case DELETE_COMMENT:
      return {
        ...state,
        posts: state.posts.filter(post =>
          post.comments.filter(comment => comment.id !== action.payload)
        ),
      };
    case ERROR_NOT_FOUND:
      return {
        ...state,
        posts: [],
        currentPage: 1,
        numberOfPages: 1,
      };
    default:
      return state;
  }
};
