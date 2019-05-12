/**
 * Storage Service
 */
export default {

  init() {
    console.log("init storage service");
  },

  save(key, data) {
    console.log("storage save", key, data);
    localStorage.setItem(key, JSON.stringify(data));
  },

  remove(key) {
    console.log("remove storage key", key);
    localStorage.removeItem(key);
  },

  get(key) {
    return JSON.parse(localStorage.getItem(key));
  }

}
