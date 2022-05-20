import axios from 'axios';

const request = {
  async login(params) {
    try{
      return await axios.post('/api/login', params);
    } catch (err) {
      return err.response;
    }
  },
  async register(params) {
    try{
      return await axios.post('/api/register', params);
    } catch (err) {
      return err.response;
    }
  },
  async chkUserId(userid) {
    try{
      return await axios.get(`/api/register/id/${userid}`);
    } catch (err) {
      return err.response;
    }
  },
  async chkNickname(nickname) {
    try{
      return await axios.get(`/api/register/name/${nickname}`);
    } catch (err) {
      return err.response;
    }
  }
}

export default request;