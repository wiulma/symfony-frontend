declare const API_URL: string;

const _API_URL = API_URL;

export {_API_URL as API_URL};

export enum NotificationMessageType {
  SUCCESS = 'success',
  ERROR = 'danger',
  INFO = 'info'
}