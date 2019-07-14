import CrudPrivateApiService from '../../../common/services/CrudPrivateApiService'

/**
 * Document Service
 * @description Client service in order to call documents related APIs
 */
export default Object.assign({}, CrudPrivateApiService, {

  EVENTS: {
    SAVED: "DocumentSaved"
  },

  entityName: 'documents'
  
})