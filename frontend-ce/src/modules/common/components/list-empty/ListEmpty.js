import domUtils from './../../../../utils/Dom';
import i18nService from './../../../../services/I18nService';

import template from './list-empty.html'

import './_list-empty.scss';

customElements.define('app-list-empty', class extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {
        const n = domUtils.htmlToElement(template);
        i18nService.localize(n);
        this.appendChild(n);
    }

});