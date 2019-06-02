import Navigo from 'navigo'
import viewService from './ViewService'
import storageService from './StorageService'
import Const from '../const';
import loaderService from '../components/loader/LoaderService';
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
          loaderService.show("main");
          viewService.emptyMainContainer();
          this.loadPrivateModule()
            .catch(() => {
              this.router.navigate('/');
            })
            .finally( () => loaderService.hide("main"))
        } catch (exc) {
          loaderService.hide("main");
          this.router.navigate('');
        }
      })
      .notFound(() => {
        this.router.navigate('');
      });
    // temp hack
    storageService.remove(Const.USER_PROFILE_KEY);
    return this.checkLoggedProfile()
      .then (this.navigateNestedRoutes.bind(this))
      .then (r => this.router.resolve())
      .catch(() => this.router.navigate(''));

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