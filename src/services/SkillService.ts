import Axios from 'axios';
import { Skill } from '../interfaces/skill';
import { apiHost } from './Api';

const apiUrl = `${apiHost}/skills`;

export default {
  async getSkills(token: string): Promise<Array<Skill>> {
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
  }
};