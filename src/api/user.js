import axios from 'axios';

const login = async (params) => {
  try {
    return await axios.post('/api/login', params);
  } catch (err) {
    return err.response;
  }
};

const loginChk = async () => {
  try {
    return await axios.get('/api/login');
  } catch (err) {
    return err.response;
  }
};

const logout = async () => {
  try {
    return await axios.get('/api/logout');
  } catch (err) {
    return err.response;
  }
};

const register = async (params) => {
  try {
    return await axios.post('/api/register', params);
  } catch (err) {
    return err.response;
  }
};

const chkUserId = async (userid) => {
  try {
    return await axios.get(`/api/register/id/${userid}`);
  } catch (err) {
    return err.response;
  }
};

const chkNickname = async (nickname) => {
  try {
    return await axios.get(`/api/register/name/${nickname}`);
  } catch (err) {
    return err.response;
  }
};

export default {
  login,
  loginChk,
  logout,
  register,
  chkUserId,
  chkNickname
};