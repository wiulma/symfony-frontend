import {isMicrosoftBrowser} from './BrowserService';

import {StorageIndexDbService} from './storage/StorageIndexDbService';
import {LocalStorageService} from './storage/LocalStorageService';

class StorageFactory {

  private static instance: StorageServiceInterface;
  
  static getInstance() {
      if (!StorageFactory.instance) {
        if (('indexedDB' in window) && !isMicrosoftBrowser()) {
          console.log('Use IndexedDB');
          StorageFactory.instance = new StorageIndexDbService();
        } else {
          StorageFactory.instance = new LocalStorageService();
        }
      }
      return StorageFactory.instance;
  }

  save(key: string, data: Object): Promise<any> {
    return StorageFactory.instance.save(key, data);
  }

  get(key: any): Promise<any> {
      return StorageFactory.instance.get(key);
  }

  delete(key: any): Promise<any> {
    return StorageFactory.instance.delete(key);
  }

  clear() {
    return StorageFactory.instance.clear();
  }

}

export default StorageFactory.getInstance();