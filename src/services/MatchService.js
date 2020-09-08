import Axios from 'axios';
import { apiHost } from './Api';

const apiUrl = `${apiHost}/match`;

export default {
  async swipe({ token, match }) {
    try {
      const res = await Axios({
        url: `${apiUrl}`,
        method: `POST`,
        data: match,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      return res.data;
    } catch (err) {
      throw new Error(err.response.data.message);
    }
  },
  async reset({ token }) {
    try {
      await Axios({
        url: `${apiUrl}`,
        method: `DELETE`,
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