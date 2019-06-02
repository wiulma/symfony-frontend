import storageService from '../../../services/StorageService';
import Const from '../../../const'

/**
 * User Service
 * @description Client service in order to call user related APIs
 */
export default {

  profile: {},

  getProfile() {
    if (!this.profile.token) {
      this.profile = storageService.get(Const.USER_PROFILE_KEY)
    }
    try {
      return fetch(`${API_URL}/api/profile`, {
        headers: {
          'Authorization': `Bearer ${this.profile.token}`
        }
      })
      .then((response) => response.ok)
      .catch(() => false);
    } catch (exc) {
      return Promise.reject(false);
    }
  },

  checkAuth() {
    try {
      return fetch(`${API_URL}/api/auth`, {
        headers: {
          'Authorization': `Bearer ${this.profile.token}`
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