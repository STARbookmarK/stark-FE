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

const changeShow = async (params) => {
  try {
    const { bookmarkShow, hashtagShow, hashtagCategory } = params;
    return await axios.patch('/api/show', {
      bookmarkShow: bookmarkShow,
      hashtagShow: hashtagShow,
      hashtagCategory: hashtagCategory
    });
  } catch (err) {
    return err.response;
  }
}

export default {
  getUserInfo,
  changePassword,
  changeInfo,
  changeShow
}