import template from './profileMenu.html'
import domUtils from './../../../../utils/Dom';
import i18nService from './../../../../services/I18nService';

customElements.define('app-profile-menu', class extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {
        const n = domUtils.htmlToElement(template);
        i18nService.localize(n);
        this.appendChild(n);
    }
})