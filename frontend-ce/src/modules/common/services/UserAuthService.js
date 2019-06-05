import storageService from '../../../services/StorageService';
import Const from '../../../const'

/**
 * User Service
 * @description Client service in order to call user related APIs
 */
export default {

  profile: {},
  auth: {},

  getProfile() {
    if (!this.auth.token) {
      this.auth = storageService.get(Const.USER_PROFILE_KEY)
    }
    try {
      return fetch(`${API_URL}/api/profile`, {
        headers: {
          'Authorization': `Bearer ${this.auth.token}`
        }
      })
      .then(response => Promise.all([response, response.json()]))
      .then(([response, data]) => {
        response.ok && (this.profile = data);
        return response.ok;
      })
      .catch(() => false);
    } catch (exc) {
      return Promise.reject(false);
    }
  },

  checkAuth() {
    try {
      return fetch(`${API_URL}/api/auth`, {
        headers: {
          'Authorization': `Bearer ${this.auth.token}`
        }
      })
      .then((response) => response.ok)
      .catch(() => false);
    } catch (exc) {
      return Promise.reject(false);
    }
  },

  logout() {
    storageService.remove(Const.USER_PROFILE_KEY);
    return Promise.resolve(true);
  }
  
}