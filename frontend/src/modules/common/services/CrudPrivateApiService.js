import userAuthService from './UserAuthService'
import SubscriberService from '../../../services/SubscriberService'
import serviceUtils from '../../../utils/Service'
/**
 * User Service
 * @description Client service in order to call user related APIs
 */
export default Object.assign({}, SubscriberService, {

  data: [],

  EVENTS: {
    SAVED: "DataSaved"
  },

  entityName: 'undefined',

  getList() {
    try {
      return fetch(`${API_URL}/api/${this.entityName}`, {
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
      return fetch(`${API_URL}/api/${this.entityName}/${id}`, {
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
      return fetch(`${API_URL}/api/${this.entityName}/${id}`, {
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

  save (data) {
    try {
      const id = data.get('id');
      return fetch(`${API_URL}/api/${this.entityName}${(id !== '') ? '/'+id : ''}`, {
          method: (id !== '') ? "PUT" : "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userAuthService.auth.token}`
          },
          body: JSON.stringify(serviceUtils.formDataToJson(data))
        })
        .then(response => Promise.all([response, response.json()]))
        .then(([result, response]) => {
          if (result.ok) {
            this.publish(this.EVENTS.SAVED);
            return [result.ok, response.data];
          } else return [result.ok, response.errors]
        })
    } catch (exc) {
      return Promise.reject(exc);
    }
    
  }
  
})