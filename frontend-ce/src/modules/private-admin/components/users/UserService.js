import userAuthService from '../../../common/services/UserAuthService'
/**
 * User Service
 * @description Client service in order to call user related APIs
 */
export default {

  data: [],

  getList() {
    try {
      return fetch(`${API_URL}/api/users`, {
        headers: {
          'Authorization': `Bearer ${userAuthService.auth.token}`
        }
      })
      .then(response => Promise.all([response, response.json()]))
      .then(([response, data]) => {
        response.ok && (this.data = data);
        return data;
      })
      .catch(() => false);
    } catch (exc) {
      return Promise.reject(false);
    }
  }
  
}