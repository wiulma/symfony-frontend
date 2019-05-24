import domUtils from '../../../../utils/Dom'

import template from './users.html'

customElements.define('app-users', class extends HTMLElement {

  constructor() {
    super();
  }

  connectedCallback() {
    const n = domUtils.htmlToElement(template);
    this.appendChild(n);
  }

});