export default {

  subs: {},

  subscribe(msg, fn) {
    this.subs[msg] = this.subs[msg] || [];
    this.subs[msg].push(fn);
  },

  publish(msg, ...data) {
    if (this.subs[msg]) {
      this.subs[msg].forEach( (fn) => {
        fn(...data)
      });
    }
  },

  unsubscribe(msg, fn) {
    this.subs[msg].splice(
      this.subs[msg].findIndex(elm => elm === fn), 1
    );
  }
}