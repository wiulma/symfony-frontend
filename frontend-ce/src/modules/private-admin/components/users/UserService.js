import Const from '../../../const'
import userAuthService from '../../../common/services/UserAuthService'
/**
 * User Service
 * @description Client service in order to call user related APIs
 */
export default {

  getList() {
    try {
      return fetch(`${API_URL}/api/users`, {
        headers: {
          'Authorization': `Bearer ${userAuthService.profile.token}`
        }
      })
      .then((response) => response.ok)
      .catch(() => false);
    } catch (exc) {
      return Promise.reject(false);
    }
  }
  
}