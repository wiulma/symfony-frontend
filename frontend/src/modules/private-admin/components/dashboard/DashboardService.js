import notificationService from "./../../../../components/notification/NotificationService"
import subscriber from "./../../../../services/SubscriberService";

export default Object.assign({}, subscriber, {

  init(elm) {
      elm.addEventListener("showHomeEventNotify", (evt) => {
        notificationService.show(`Event received from dashboard view, data: ${evt.detail}`);
      });
  },

  destroy() {
      console.log("home service destroy");
  },

  refresh(data) {
      setTimeout(() =>{
        this.publish("refresh", data);
      }, 1000);
  }
});
