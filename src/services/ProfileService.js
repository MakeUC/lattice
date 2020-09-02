import Axios from 'axios';

const apiUrl = `http://localhost:3000/profile`;

export default {

  async getProfile({ token }) {
    try {
      const res = await Axios({
        url: `${apiUrl}/`,
        method: `GET`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      return res.data;
    } catch (err) {
      throw new Error(err.response.data.message);
    }
  }
};