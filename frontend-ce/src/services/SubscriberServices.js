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
  }
}