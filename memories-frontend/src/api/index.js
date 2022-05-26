import axios from 'axios';

const API = axios.create({
  // baseURL: 'https://627097436a36d4d62c1af505.mockapi.io/api/v1',
  baseURL: 'http://127.0.0.1:8000/api/v1',
});

export const fetchPosts = (page, searchQuery) => {
  return API.get(
    `/posts?search=${
      searchQuery?.search ? searchQuery.search : ''
    }&page=${page}&limit=8`
  );
};

export const fetchPost = id => API.get(`/posts/${id}`);

export const signIn = formData => API.post('/auth/login', formData);
