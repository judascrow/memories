import axios from 'axios';

const API = axios.create({
  baseURL: 'https://627097436a36d4d62c1af505.mockapi.io/api/v1',
});

// API.interceptors.request.use((req) => {
//   if (localStorage.getItem('profile')) {
//     req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
//   }

//   return req;
// });

export const fetchPosts = page => API.get(`/posts?page=${page}&limit=8`);

// export const fetchPost = (id) => API.get(`/posts/${id}`);
// export const fetchPostsByCreator = (name) => API.get(`/posts/creator?name=${name}`);
export const fetchPostsBySearch = searchQuery => {
  if (searchQuery.tags !== '') {
    return API.get(
      `/posts?search=${searchQuery.search}&tags=${searchQuery.tags}`
    );
  } else {
    return API.get(`/posts?search=${searchQuery.search}`);
  }
};

// export const createPost = (newPost) => API.post('/posts', newPost);
// export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
// export const comment = (value, id) => API.post(`/posts/${id}/commentPost`, { value });
// export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
// export const deletePost = (id) => API.delete(`/posts/${id}`);

// export const signIn = (formData) => API.post('/user/signin', formData);
// export const signUp = (formData) => API.post('/user/signup', formData);
