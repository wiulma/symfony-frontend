import 'bootstrap';

import routingService from './services/RoutingService'
import storageService from './services/StorageService'

import './app.scss'

if (module.hot) {
  module.hot.accept()
}

routingService.init();
storageService.init();