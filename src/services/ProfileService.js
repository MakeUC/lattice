import Axios from 'axios';
import { apiHost } from './Api';

const apiUrl = `${apiHost}/profile`;

export default {
  async getProfiles({ token }) {
    try {
      const res = await Axios({
        url: `${apiUrl}/list`,
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
  },

  async startProfile({ token }) {
    try {
      await Axios({
        url: `${apiUrl}/start`,
        method: `POST`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      return;
    } catch (err) {
      throw new Error(err.response.data.message);
    }
  },

  async updateProfile({ token, profile }) {
    try {
      const res = await Axios({
        url: `${apiUrl}/`,
        method: `PUT`,
        data: profile,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      return res.data;
    } catch (err) {
      throw new Error(err.response.data.message);
    }
  },

  async setVisible({ token, visible }) {
    try {
      const res = await Axios({
        url: `${apiUrl}/visible`,
        method: `PUT`,
        data: { visible },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      return res.data;
    } catch (err) {
      throw new Error(err.response.data.message);
    }
  },

  async getSkills({ token }) {
    try {
      const res = await Axios({
        url: `${apiUrl}/skills`,
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

  async completeTour({ token, tour }) {
    try {
      await Axios({
        url: `${apiUrl}/tour/${tour}`,
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