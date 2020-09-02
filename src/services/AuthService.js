import Axios from 'axios';

const apiUrl = `http://localhost:3000/auth`;

export default {

  async getRegistrantEmail(id) {
    try {
      const res = await Axios({
        url: `${apiUrl}/email/${id}`,
        method: `GET`
      });
  
      return res.data;
    } catch (err) {
      throw new Error(err.response.data.message);
    }
  },

  async register(registrantId, password) {
    try {
      const res = await Axios({
        url: `${apiUrl}/register`,
        method: `POST`,
        data: { registrantId, password }
      });
  
      return res.data;
    } catch (err) {
      throw new Error(err.response.data.message);
    }
  },

  async login(email, password) {
    try {
      const res = await Axios({
        url: `${apiUrl}/login`,
        method: `POST`,
        data: { email, password }
      });
  
      return res.data;
    } catch (err) {
      throw new Error(err.response?.data.message || `Cannot reach server, please try again later`);
    }
  }
};