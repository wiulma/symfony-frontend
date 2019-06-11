import domUtils from './../../../../utils/Dom';
import template from './data-table.html';

customElements.define('data-table', class extends HTMLElement {
// https://ayushgp.github.io/html-web-components-using-vanilla-js-part-2/

    constructor() {
        super();
        const n = domUtils.htmlToElement(template);
        const shadowRoot = this.attachShadow({mode: 'open'})
            .appendChild(n);
    }

})