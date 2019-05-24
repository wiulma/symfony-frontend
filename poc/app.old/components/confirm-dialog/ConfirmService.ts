import {SubscriberService} from '../../services/SubscriberService';
import {ConfirmDialog} from './ConfirmDialog';

class ConfirmService extends SubscriberService {

    private static instance: ConfirmService;
 
    static getInstance() {
        if (!ConfirmService.instance) {
            ConfirmService.instance = new ConfirmService();
        }
        return ConfirmService.instance;
    }

    confirm(d: ConfirmData) {
        this.publish("NotifyConfirm", {
            ...d
          });
    }

}

export default ConfirmService.getInstance();