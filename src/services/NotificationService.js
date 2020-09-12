import Axios from 'axios';
import { apiHost } from './Api';

const apiUrl = `${apiHost}/notification`;

export default {
  async getNotifications({ token }) {
    try {
      const res = await Axios({
        url: `${apiUrl}`,
        method: `GET`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      return res.data;
    } catch (err) {
      throw new Error(err.response.data.message);
    }
  },
  async readNotifications({ token }) {
    try {
      await Axios({
        url: `${apiUrl}/read`,
        method: `POST`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      return;
    } catch (err) {
      throw new Error(err.response.data.message);
    }
  }
};