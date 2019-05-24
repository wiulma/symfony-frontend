import domUtils from '../../../../utils/Dom'

import template from './docTypes.html'

customElements.define('app-doc-types', class extends HTMLElement {

  constructor() {
    super();
  }

  connectedCallback() {
    const n = domUtils.htmlToElement(template);
    this.appendChild(n);
  }

});