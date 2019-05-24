import domUtils from '../../../../utils/Dom'

import template from './sensors.html'

customElements.define('app-sensors', class extends HTMLElement {

  constructor() {
    super();
  }

  connectedCallback() {
    const n = domUtils.htmlToElement(template);
    this.appendChild(n);
  }

});