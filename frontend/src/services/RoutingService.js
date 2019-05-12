import Navigo from 'navigo'
import viewService from './ViewService'
import storageService from './StorageService'
import Const from '../const';
import MaskService from '../components/loader/MaskService';
/**
 * Routing service
 * @description routing service manager
 */
export default {

  nav: [],

  loadPrivateModule() {
    const pdata = storageService.get(Const.USER_PROFILE_KEY);
    if (!pdata) return Promise.resolve(false);
    const profile = viewService.profileView[pdata.role];
    return import(/* webpackChunkName: "private" */ `./../modules/${profile.module}/index`)
      .then(p => p.default.init())
  },

  checkLoggedProfile() {
    const llh = location.hash.slice(1) ? location.hash.slice(1): "";
    if(!this.router.lastRouteResolved() &&  llh.split('/').length)  {
      return this.loadPrivateModule();
    }
    return Promise.resolve();
  },

  init() {
    this.router = new Navigo('localhost:8080', true);
    this.router.hooks({
      after: () => this.nav.push(this.router._lastRouteResolved.url)
    });

    this.router
      .on('/', () => {
        import('./../components/login/Login');
        import('./../components/notification/Notification');
      })
      .on('private', () => {
        try {
          MaskService.mask("main")
          this.loadPrivateModule()
            .catch(() => {
              this.router.navigate('/');
            })
            .finally( () => MaskService.unmask("main"))
        } catch (exc) {
          MaskService.unmask("main")
          this.router.navigate('');
        }
      })
      .notFound(() => {
        this.router.navigate('');
      });

    return this.checkLoggedProfile()
      .then (this.navigateNestedRoutes.bind(this))
      .then (r => this.router.resolve());

  },

  navigateNestedRoutes() {
    // call hooks on nested routes before goto current route
    return Promise.resolve();
  },

  get() {
    return this.router;
  },

  hasNav() {
    return !!this.nav.length
  },

  logout() {
    this.router.navigate("");
    location.reload();
  }

}