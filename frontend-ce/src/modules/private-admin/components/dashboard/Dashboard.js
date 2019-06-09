
import domUtils from '../../../../utils/Dom'
import template from './dashboard.html'
import './_dashboard.scss'

customElements.define('app-dashboard', class extends HTMLElement {

  constructor() {
    super();
    this.listeners = {
    }
  }

  connectedCallback() {
    const n = domUtils.htmlToElement(template);    
    this.appendChild(n);
  }

});