
interface NotificationMessage {
  title: string,
  message: string,
  details?: string | string[]
}

interface NotificationTypeMessage extends NotificationMessage {
  type: string
}