import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const signin = (formData, navigate, toast) => async dispatch => {
  try {
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data });

    navigate('/');
  } catch (error) {
    console.log(error);
    toast({
      title: error.response.data?.message,
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
  }
};

export const signup = (formData, navigate, toast) => async dispatch => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });

    navigate('/');
  } catch (error) {
    console.log(error);
    toast({
      title: error.response.data?.message,
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
  }
};
