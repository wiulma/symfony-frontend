import domUtils from '../../../../utils/Dom';
import template from './documents.html';

customElements.define("app-documents", class extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {
        const n = domUtils.htmlToElement(template);
        this.appendChild(n);
    }

})