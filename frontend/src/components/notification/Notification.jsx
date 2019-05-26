import React, {useState, useEffect} from 'react';
import notificationService from './NotificationService';

import './_styles.scss';


export default function() {

  const ALERT_VISIBLE_TIMEOUT = 10;

  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({type: '', message: '', title: ''});

  const renderMessageDetails = () => {
    const list = [];
    let details = notification.details;
    if (!details) return [];
    if (typeof(details) === "string") details = [details];
    for (let i=0, l=details.length; i<l; i++) {
      list.push(<p className="m-0 details" key={`detail-${i}`}>{`${details[i]}`}</p>);
    }
    return list;
  }

  const handleDismiss = () => {
    setShow(false);
    setNotification(null);
  }

  useEffect(() => {
    const subscription = notificationService.getMessage().subscribe(message => {
      setNotification(message);
      setShow(true)
      setTimeout(() => {
        if (show) {
          handleDismiss();
        }
      }, (ALERT_VISIBLE_TIMEOUT * 1000));
    });

    return function cleanup() {
      subscription.unsubscribe();
    }
  }, [show]);

  return(
     (show && notification) ?
      (
        <div className={'alert alert-'+notification.type+' fade show notification'} role="alert">
          <h5 className="alert-heading">{notification.title}</h5>
          <p className="m-0 message">{notification.message}</p>
          {renderMessageDetails()}
          <button type="button" className="close" data-dismiss="alert" onClick={handleDismiss} aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      ) : null 
  );
}
