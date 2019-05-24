export default {

  STYLE: {
    SUCCESS: 'success',
    ERROR: 'error'
  },

  show(text, style = "") {
    const evt = new CustomEvent("showNotification", {detail: {text, style}})
    document.dispatchEvent(evt);
  }
}
