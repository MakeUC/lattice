import Axios from 'axios';
import { apiHost } from './Api';

const apiUrl = `${apiHost}/auth`;

export default {

  async getRegistrantEmail(id) {
    try {
      const res = await Axios({
        url: `${apiUrl}/email/${id}`,
        method: `GET`
      });
  
      return res.data;
    } catch (err) {
      throw new Error(err.response.data.message || `Cannot reach server, please try again later`);
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
      throw new Error(err.response.data.message || `Cannot reach server, please try again later`);
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
  },

  async changePassword({ token, oldPassword, newPassword }) {
    try {
      await Axios({
        url: `${apiUrl}/password`,
        method: `PUT`,
        data: { oldPassword, newPassword },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      return;
    } catch (err) {
      throw new Error(err.response?.data.message || `Cannot reach server, please try again later`);
    }
  },

  async sendResetLink(email) {
    try {
      const res = await Axios({
        url: `${apiUrl}/reset`,
        method: `POST`,
        data: { email }
      });
  
      return res.data;
    } catch (err) {
      throw new Error(err.response.data.message || `Cannot reach server, please try again later`);
    }
  },

  async getResetInfo(resetToken) {
    try {
      const res = await Axios({
        url: `${apiUrl}/reset/${resetToken}`,
        method: `GET`
      });
  
      return res.data;
    } catch (err) {
      throw new Error(err.response.data.message || `Cannot reach server, please try again later`);
    }
  },

  async resetPassword(resetToken, password) {
    try {
      await Axios({
        url: `${apiUrl}/reset`,
        method: `PUT`,
        data: { resetToken, password }
      });
  
      return;
    } catch (err) {
      throw new Error(err.response.data.message || `Cannot reach server, please try again later`);
    }
  }
};