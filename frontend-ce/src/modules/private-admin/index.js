import viewService from './../../services/ViewService'
import routingService from './../../services/RoutingService'
import privateRoutingService from '../common/services/PrivateRoutingService'
import userService from '../common/services/UserService'

export default {

  init() {
    return userService.checkAuth()
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
      .on('private/sensors', () => {
        import ('../common/components/sensors/Sensors');
        document.getElementById(viewService.CONTENT_AREA).innerHTML = "<app-sensors></app-sensors>";
      }, {
        before: privateRoutingService.authGuard.bind(privateRoutingService)
      })
      .on('private/users', () => {
        import ('./components/users/Users');
        document.getElementById(viewService.CONTENT_AREA).innerHTML = "<app-users></app-users>";
      }, {
        before: privateRoutingService.authGuard.bind(privateRoutingService)
      })

  }

}
