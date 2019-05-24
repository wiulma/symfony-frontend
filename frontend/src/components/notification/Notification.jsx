import * as React from 'react';
import {default as notificationService} from './NotificationService';

import './_styles.scss';

export class NotificationAlert  {

  ALERT_VISIBLE_TIMEOUT = 10;
    
  constructor(props) {
    super(props);

    this.handleDismiss = this.handleDismiss.bind(this);
    this.showMessage = this.showMessage.bind(this);
    this.renderMessageDetails = this.renderMessageDetails.bind(this);

    this.state = {
      show: false
    };
  }

  componentDidMount() {
    notificationService.subscribe("NotifyAlert", this.showMessage);
  }

  componentWillUnmount() {
    notificationService.unsubscribe("NotifyAlert", this.showMessage);
  }

  showMessage(detail) {
    this.setState({ show: true, notification: detail})
    setTimeout(this.hideMessage.bind(this), (this.ALERT_VISIBLE_TIMEOUT * 1000));
  }

  hideMessage() {
    if (this.state.show) {
      this.handleDismiss();
    }
  }

  renderMessageDetails() {
    const list = [];
    let details = this.state.notification.details;
    if (!details) return [];
    if (typeof(details) === "string") details = [details];
    for (let i=0, l=details.length; i<l; i++) {
      list.push(<p className="m-0 details" key={`detail-${i}`}>{`${details[i]}`}</p>);
    }
    return list;
  }

  handleDismiss() {
    this.setState({ show: false, notification: null });
  }

  render() {
    if (this.state.show && this.state.notification) {
      return (
        <div className={'alert alert-'+this.state.notification.type+' fade show notification'} role="alert">
          <h5 className="alert-heading">{this.state.notification.title}</h5>
          <p className="m-0 message">{this.state.notification.message}</p>
          {this.renderMessageDetails()}
          <button type="button" className="close" data-dismiss="alert" onClick={this.handleDismiss} aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      ) 
    } else 
    return null;    
  }
}