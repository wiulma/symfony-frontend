import 'bootstrap';
import 'mdbootstrap';

import i18nService from './services/I18nService';

import routingService from './services/RoutingService'
import storageService from './services/StorageService'

import './app.scss'

if (module.hot) {
  module.hot.accept()
}
console.log("routingService.init");

i18nService.init()
  .then (() => {
    routingService.init();
    storageService.init();
  })

