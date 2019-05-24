import userService from './UserAuthService'
import routingService from '../../../services/RoutingService'

export default {

  authGuard(done, params) {
    return userService.checkAuth()
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