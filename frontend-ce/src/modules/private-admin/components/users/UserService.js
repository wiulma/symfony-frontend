import userAuthService from '../../../common/services/UserAuthService'
import '../../../../services/SubscriberServices'

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
      .then(([result, response]) => {
        result.ok && (this.data = response.data);
        return response.data;
      })
      .catch(() => false);
    } catch (exc) {
      return Promise.reject(false);
    }
  },

  getDetails(id) {
    return this.data.find( e => e.id == id);
  },

  getById(id) {
    return {}
  },

  search() {
    return []
  },

  delete(id) {
    return Promise.resolve(true);
  }
  
}