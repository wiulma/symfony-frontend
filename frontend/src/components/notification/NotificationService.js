export default {

  STYLE: {
    SUCCESS: 'success',
    ERROR: 'danger'
  },

  show(message, style = "danger") {
    const evt = new CustomEvent("showNotification", {detail: {...message, style}})
    document.dispatchEvent(evt);
  },

  showResult(message, style, container = null) {
    if (container) {
      const c = document.getElementById(container);
      if (c) {
        const p = document.createElement('p');
        p.classList.add('message', style);
        p.innerText = message;
        c.appendChild(p);
      }      
    } else {
      this.show(message, style);
    } 
  },

  clearResult(container) {
    const c = document.getElementById(container);
    if (c) c.innerText = '';
  }
}
