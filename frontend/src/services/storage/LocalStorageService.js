export default {
   
    save(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
        return Promise.resolve(true);
    },
  
    get(key){
        return Promise.resolve(JSON.parse(localStorage.getItem(key)));
    },
  
    delete(key) {
      return Promise.resolve(localStorage.removeItem(key))
    },
  
    clear() {
      return localStorage.clear();
    }
  
  }