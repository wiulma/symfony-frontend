import userAuthService from './UserAuthService'
import routingService from '../../../services/RoutingService'

export default {

  authGuard(done, params) {
    debugger;
    return userAuthService.checkAuth()
      .then(() => {
        console.log("userService.checkAuth done");
        done();
      })
      .catch(exc => {
        console.error("userService.checkAuth catch", exc);
        routingService.get().navigate("");
      });
  }

}