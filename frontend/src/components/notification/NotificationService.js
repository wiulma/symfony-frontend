
import {NotificationMessageType} from '../../utils/Constants';

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
