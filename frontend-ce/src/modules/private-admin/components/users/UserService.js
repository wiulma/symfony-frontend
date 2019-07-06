import userAuthService from '../../../common/services/UserAuthService'
import SubscriberServices from '../../../../services/SubscriberServices'

/**
 * User Service
 * @description Client service in order to call user related APIs
 */
export default Object.assign({}, SubscriberServices, {

  data: [],

  EVENTS: {
    USER_SAVED: "UserSaved"
  },

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
    try {
      return fetch(`${API_URL}/api/users/${id}`, {
        headers: {
          'Authorization': `Bearer ${userAuthService.auth.token}`
        }
      })
      .then(response => Promise.all([response, response.json()]))
      .then(([result, response]) => (result.ok) ? response.data : null)
      .catch(() => false);
    } catch (exc) {
      return Promise.reject(false);
    }
  },

  search() {
    return []
  },

  delete(id) {
    try {
      return fetch(`${API_URL}/api/users/${id}`, {
          method: "DELETE",
          headers: {
            'Authorization': `Bearer ${userAuthService.auth.token}`
          }
        })
        .then(response => response.ok)
        .catch(() => false);
    } catch (exc) {
      return Promise.reject(exc);
    }
  },

  save (user) {
    try {
      return fetch(`${API_URL}/api/users${(user.id !== '') ? '/'+user.id : ''}`, {
          method: (user.id !== '') ? "PUT" : "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userAuthService.auth.token}`
          },
          body: JSON.stringify(user)
        })
        .then(response => Promise.all([response, response.json()]))
        .then(([result, response]) => {
          if (result.ok) {
            this.publish(this.EVENTS.USER_SAVED);
            return response.data;
          }
        })
        .catch(() => false);
    } catch (exc) {
      return Promise.reject(exc);
    }
    
  }
  
})