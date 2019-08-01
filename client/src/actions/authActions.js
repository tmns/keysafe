import axios from 'axios';
import ls from 'local-storage';

import { GET_ERRORS, CLEAR_ERRORS, SET_CURRENT_USER } from './types';
import { generateKey } from '../util/crypto';

export const registerUser = (userData, history) => async dispatch => {
  try {
    await axios.post('/api/users/register', userData);
    history.push('/login');
  } catch(err) {
    dispatch({ type: GET_ERRORS, payload: err.response.data });
  }
}

export const loginUser = (userData, history) => async dispatch => {
  try {
    const res = await axios.post('/api/users/login', userData);
    
    // generate user encryption / decryption key
    const edKey = await generateKey(res.data.salt, userData.password);
    ls.set('edKey', edKey);
    
    dispatch(setCurrentUser({ user: res.data.username, userId: res.data.id }));
    history.push('/dashboard');
  } catch(err) {
    dispatch({ type: GET_ERRORS, payload: err.response.data });
  }
}

export const logoutUser = () => async dispatch => {
  try {
    await axios.post('/api/users/logout');
    dispatch(setCurrentUser({}));
  } catch(err) {
    console.log(err);
  }
}

export const setCurrentUser = userData => {
  return {
    type: SET_CURRENT_USER, 
    payload: userData
  }
}

export const clearErrors = () => {
  return {
      type: CLEAR_ERRORS
  }
}