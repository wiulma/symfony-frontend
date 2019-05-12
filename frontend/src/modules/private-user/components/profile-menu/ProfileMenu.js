import template from './profileMenu.html'
import domUtils from './../../../../utils/Dom';

customElements.define('app-profile-menu', class extends HTMLElement {


    constructor() {
        super();
    }

    connectedCallback() {
        this.appendChild(domUtils.htmlToElement(template))
    }
})