import CrudPrivateApiService from '../../../common/services/CrudPrivateApiService'

/**
 * Document Type Service
 * @description Client service in order to call document types related APIs
 */
export default Object.assign({}, CrudPrivateApiService, {

  EVENTS: {
    SAVED: "ArticleSaved"
  },

  entityName: 'articles'
  
})