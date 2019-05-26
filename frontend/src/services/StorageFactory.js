import {isMicrosoftBrowser} from './BrowserService';

import StorageIndexDbService from './storage/StorageIndexDbService';
import LocalStorageService from './storage/LocalStorageService';

class StorageFactory {

  constructor() {
      if (!StorageFactory.instance) {
        // if (('indexedDB' in window) && !isMicrosoftBrowser()) {
        //  console.log('Use IndexedDB');
        //  StorageFactory.instance = StorageIndexDbService;
        //  StorageFactory.instance.init();
        //} else {
          StorageFactory.instance = LocalStorageService;
        //}
      }
      return StorageFactory.instance;
  }

  save(key, data){
    return StorageFactory.instance.save(key, data);
  }

  get(key) {
      return StorageFactory.instance.get(key);
  }

  delete(key) {
    return StorageFactory.instance.delete(key);
  }

  clear() {
    return StorageFactory.instance.clear();
  }

}

const instance = new StorageFactory();
Object.freeze(instance);

export default instance;