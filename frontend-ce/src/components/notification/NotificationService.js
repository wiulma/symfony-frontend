export default {

  STYLE: {
    SUCCESS: 'success',
    ERROR: 'danger'
  },

  show(message, style = "danger") {
    const evt = new CustomEvent("showNotification", {detail: {...message, style}})
    document.dispatchEvent(evt);
  }
}
