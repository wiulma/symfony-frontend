import domUtils from './../../../../utils/Dom';
import template from './dashboard.html';

customElements.define('app-dashboard', class extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {
        const n = domUtils.htmlToElement(template);
        this.appendChild(n);
    }


})