import domUtils from '../../../../utils/Dom'
import i18nService from './../../../../services/I18nService';

import tmplMain from './main.html'
import tmplList from './list.html'
import tmplItem from './item.html'

customElements.define('app-users', class extends HTMLElement {

  constructor() {
    super();
  }

  connectedCallback() {
    const n = domUtils.htmlToElement(tmplMain);
    i18nService.localize(n);
    this.className = "container";
    this.appendChild(n);
  }

});