/**
 * StorageIndexDbService
 */
import { openDB } from 'idb';

import CONST from '../../config';

export default {

  storeName: CONST.STORE_NAME,

  constructor() {
    const self = this;
    this.dbPromise = openDB(`${CONST.STORE_NAME}-localdb`, 1, function(upgradeDb) {
      if (!upgradeDb.objectStoreNames.contains(CONST.STORE_NAME)) {
        upgradeDb.createObjectStore(self.storeName, {keyPath: 'key'});
      }
    });
  },

  save(key, data) {
    return this.dbPromise.then((db) => {
      const tx = db.transaction(CONST.STORE_NAME, 'readwrite');
      tx.objectStore(CONST.STORE_NAME).put(Object.assign({}, {key}, data));
      return tx.complete;
    })
  },

  get(key) {
      return this.dbPromise.then(async (db) => {
        const store = db.transaction(CONST.STORE_NAME)
          .objectStore(CONST.STORE_NAME);
        return  await store.get(key);
      });
  },
/*
  getAll<TKey, TValue>(storeName: string): Promise<TValue[]> {
    return this.dbPromise.then(async (db: DB) => {
      const store: ObjectStore<TValue, TKey> = db.transaction(storeName)
        .objectStore(storeName);
      return  await store.getAll();
    });
  }  
*/
  delete(key) {
    return this.dbPromise.then((db) => {
      const tx = db.transaction(CONST.STORE_NAME, 'readwrite');
      tx.objectStore(CONST.STORE_NAME).delete(key);
      return tx.complete;
    });
  },

  clear() {
    return this.dbPromise.then((db) => {
      const tx = db.transaction(CONST.STORE_NAME, 'readwrite');
      tx.objectStore(CONST.STORE_NAME).clear();
      return tx.complete;
    });
  }

}