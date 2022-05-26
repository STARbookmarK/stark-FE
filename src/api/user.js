import axios from 'axios';

const getUserInfo = async () => {
  try {
    return await axios.get('/api/infos');
  } catch (err) {
    return err.response;
  }
}

export default {
  getUserInfo
}