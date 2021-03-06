import viewService from './../../services/ViewService'
import routingService from './../../services/RoutingService'
import privateRoutingService from '../common/services/PrivateRoutingService'
import userAuthService from '../common/services/UserAuthService'

import '../common/styles/_private.scss';

export default {

  init() {
    return userAuthService.getProfile()
      .then(() => {
        this.initRoutes();
        this.initContent();
      })
  },

  initContent() {
    document.body.className = "private";
    import ('../common/components/home/Home');
    import ('./components/profile-menu/ProfileMenu');
    import ('./components/dashboard/Dashboard');
    document.getElementById(viewService.ROOT_AREA).innerHTML = "<app-home></app-home>";
    routingService.router.updatePageLinks();
  },

  initRoutes() {
    routingService.router
      .on('private/dashboard', () => {
        document.getElementById(viewService.CONTENT_AREA).innerHTML = "<app-dashboard></app-dashboard>";
      }, {
        before: privateRoutingService.authGuard.bind(privateRoutingService)
      })
      /*
      .on('private/documents', () => {
        import ('../common/components/documents/Documents');
        document.getElementById(viewService.CONTENT_AREA).innerHTML = "<app-documents></app-documents>";
      }, {
        before: privateRoutingService.authGuard.bind(privateRoutingService)
      })
      */
      
  }

}
