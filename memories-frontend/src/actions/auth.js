import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const signin = (formData, router) => async dispatch => {
  try {
    const { data } = await api.signIn(formData);

    // const data = await {
    //   result: {
    //     name: 'Thongchai',
    //     email: 'test@gmail.com',
    //     password: '12345678',
    //     id: '1',
    //   },
    //   token: 'afsafsafwfwfwfwqfwfwf',
    // };

    dispatch({ type: AUTH, data });

    router('/');
  } catch (error) {
    console.log(error);
  }
};
