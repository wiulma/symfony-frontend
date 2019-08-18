import CrudPrivateApiService from '../../../common/services/CrudPrivateApiService'

/**
 * Users Service
 * @description Client service in order to call users related APIs
 */
export default Object.assign({}, CrudPrivateApiService, {

  EVENTS: {
    SAVED: "UserSaved"
  },

  entityName: 'users'
  
})