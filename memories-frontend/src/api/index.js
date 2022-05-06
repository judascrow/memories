import axios from 'axios';

const API = axios.create({
  baseURL: 'https://627097436a36d4d62c1af505.mockapi.io/api/v1',
});

export const fetchPosts = (page, searchQuery) => {
  return API.get(
    `/posts?search=${
      searchQuery?.search ? searchQuery.search : ''
    }&page=${page}&limit=8`
  );
};

export const fetchPost = id => API.get(`/posts/${id}`);

export const fetchPostsBySearch = searchQuery => {
  if (searchQuery.tags !== '') {
    return API.get(
      `/posts?search=${searchQuery.search}&tags=${searchQuery.tags}`
    );
  } else {
    return API.get(`/posts?search=${searchQuery.search}&page=1&limit=8`);
  }
};
