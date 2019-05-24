
import {NotificationMessageType} from '../../utils/Constants';
import {SubscriberService} from '../../services/SubscriberService';

class NotificationService extends SubscriberService {

  private static instance: NotificationService;
 
  static getInstance() {
      if (!NotificationService.instance) {
        NotificationService.instance = new NotificationService();
      }
      return NotificationService.instance;
  }

  error(m: NotificationMessage) {

    this.publish("NotifyAlert", {
      type: NotificationMessageType.ERROR,
      ...m
    });
  }

  success(m: NotificationMessage) {

    this.publish("NotifyAlert", {
      type: NotificationMessageType.SUCCESS,
      ...m
    });
  }

  info(m: NotificationMessage) {

    this.publish("NotifyAlert", {
      type: NotificationMessageType.INFO,
      ...m
    });
  }

}

export default NotificationService.getInstance();