import axios from 'axios';

const API = axios.create({
  // baseURL: 'https://627097436a36d4d62c1af505.mockapi.io/api/v1',
  baseURL: 'http://127.0.0.1:8000/api/v1',
});

API.interceptors.request.use(req => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem('profile')).token
    }`;
  }

  return req;
});

export const fetchPosts = (page, searchQuery) => {
  return API.get(
    `/posts?search=${
      searchQuery?.search ? searchQuery.search : ''
    }&page=${page}&limit=8`
  );
};

export const fetchPost = id => API.get(`/posts/${id}`);
export const createPost = newPost => API.post('/posts', newPost);
export const updatePost = (id, updatedPost) =>
  API.put(`/posts/${id}`, updatedPost);
export const deletePost = id => API.delete(`/posts/${id}`);
export const likePost = id => API.patch(`/posts/${id}/like`);

export const signIn = formData => API.post('/auth/login', formData);
export const signUp = formData => API.post('/auth/register', formData);
