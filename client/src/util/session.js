import axios from 'axios';

async function checkIfLoggedIn() {
  let initialState;
  try {
    const res = await axios.get('/api/users/current');
    initialState = {
      auth: {
        username: res.data.username,
        userId: res.data.id,
        isAuthenticated: true
      }
    }
  } catch (err) {
    initialState = {};
  }
  
  return initialState;
}

export {
  checkIfLoggedIn
}