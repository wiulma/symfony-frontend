/**
 * StorageIndexDbService
 */
import idb, { Transaction, DB, ObjectStore, UpgradeDB } from 'idb';


export class StorageIndexDbService implements StorageServiceInterface {

  private dbPromise: Promise<any>;
  private storeName: string = 'row';

  constructor() {
    const self = this;
    this.dbPromise = idb.open('row-localdb', 1, function(upgradeDb: UpgradeDB) {
      if (!upgradeDb.objectStoreNames.contains(self.storeName)) {
        upgradeDb.createObjectStore(self.storeName, {keyPath: 'key'});
      }
    });
  }

  save(key: string, data: Object): Promise<any> {
    return this.dbPromise.then((db: DB) => {
      const tx: Transaction = db.transaction(this.storeName, 'readwrite');
      const r = tx.objectStore(this.storeName).put(Object.assign({}, {key}, data));
      return tx.complete;
    })
  }

  get<TKey, TValue>(key: TKey): Promise<TValue> {
      return this.dbPromise.then(async (db: DB) => {
        const store: ObjectStore<TValue, TKey> = db.transaction(this.storeName)
          .objectStore(this.storeName);
        return  await store.get(key);
      });
  }
/*
  getAll<TKey, TValue>(storeName: string): Promise<TValue[]> {
    return this.dbPromise.then(async (db: DB) => {
      const store: ObjectStore<TValue, TKey> = db.transaction(storeName)
        .objectStore(storeName);
      return  await store.getAll();
    });
  }  
*/
  delete(key: IDBValidKey): Promise<any> {
    return this.dbPromise.then((db: DB) => {
      const tx: Transaction = db.transaction(this.storeName, 'readwrite');
      tx.objectStore(this.storeName).delete(key);
      return tx.complete;
    });
  }

  clear() {
    return this.dbPromise.then((db: DB) => {
      const tx: Transaction = db.transaction(this.storeName, 'readwrite');
      tx.objectStore(this.storeName).clear();
      return tx.complete;
    });
  }

}