import axios from 'axios';

const getUserInfo = async () => {
  try {
    return await axios.get('/api/infos');
  } catch (err) {
    return err.response;
  }
}

const changePassword = async (params) => {
  try {
    const { pw, npw } = params;
    return await axios.patch('/api/password', {
      pw: pw,
      newPw: npw
    });
  } catch (err) {
    return err.response;
  }
}

const changeInfo = async (info) => {
  try {
    return await axios.patch('/api/infos', { info: info });
  } catch (err) {
    return err.response;
  }
}

export default {
  getUserInfo,
  changePassword,
  changeInfo
}