
import {NotificationMessageType} from '../../utils/Constants';


import { Subject } from 'rxjs';

const subject = new Subject();

export default {

    error: message => subject.next({ type: NotificationMessageType.ERROR, ...message }),

    success: message => subject.next({ type: NotificationMessageType.SUCCESS, ...message }),

    info: message => subject.next({ type: NotificationMessageType.INFO, ...message }),

    clearMessages: () => subject.next(),
    getMessage: () => subject.asObservable()
};

/*

class NotificationService {

  static instance;
 
  static getInstance() {
      if (!NotificationService.instance) {
        NotificationService.instance = new NotificationService();
      }
      return NotificationService.instance;
  }

  error(m) {

    this.publish("NotifyAlert", {
      type: NotificationMessageType.ERROR,
      ...m
    });
  }

  success(m) {

    this.publish("NotifyAlert", {
      type: NotificationMessageType.SUCCESS,
      ...m
    });
  }

  info(m) {

    this.publish("NotifyAlert", {
      type: NotificationMessageType.INFO,
      ...m
    });
  }

}

const instance = new NotificationService();
Object.freeze(instance);

export default instance;
*/
