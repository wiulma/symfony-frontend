export class SubscriberService {

  subs: {[key: string]: any[]} = {};

  subscribe(msg: string, fn: any) {
    this.subs[msg] = this.subs[msg] || [];
    this.subs[msg].push(fn);
  }

  publish(msg: string, data?: any) {
    if (this.subs[msg]) {
      this.subs[msg].forEach( (fn: any) => {
        fn(data)
      });
    }
  }

  unsubscribe(msg: string, fn: any) {
    this.subs[msg].splice(
      this.subs[msg].findIndex(elm => elm === fn), 1
    );
  }

}