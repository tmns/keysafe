import axios from 'axios';
import { GET_ERRORS, CLEAR_ERRORS, SET_CURRENT_USER } from './types';

export const registerUser = (userData, history) => async dispatch => {
  try {
    await axios.post('/api/users/register', userData);
    history.push('/login');
  } catch(err) {
    dispatch({ type: GET_ERRORS, payload: err.response.data });
  }
}

export const clearErrors = () => {
  return {
      type: CLEAR_ERRORS
  }
}