export class LocalStorageService implements StorageServiceInterface {
  
    constructor() {}
  
    save(key: string, data: Object): Promise<any> {
        localStorage.setItem(key, JSON.stringify(data));
        return Promise.resolve(true);
    }
  
    get(key: string): Promise<any> {
        return Promise.resolve(JSON.parse(localStorage.getItem(key)));
    }
  
    delete(key: string): Promise<any> {
      return Promise.resolve(localStorage.removeItem(key))
    }
  
    clear() {
      return localStorage.clear();
    }
  
  }