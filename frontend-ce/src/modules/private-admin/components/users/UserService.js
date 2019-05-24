import Const from '../../../const'

/**
 * User Service
 * @description Client service in order to call user related APIs
 */
export default {

  profile: {},

  getList() {
    if (!this.profile.token) {
      this.profile = storageService.get(Const.USER_PROFILE_KEY)
    }
    try {
      return fetch(`${API_URL}/api/users`, {
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