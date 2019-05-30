import domUtils from '../../utils/Dom';
import template from './loader.html';

import './_loader.scss';

customElements.define('app-loader', class extends HTMLElement {

    constructor() {
        super();
        this.listeners = {
            'click': this.onClick.bind(this)
          };    
    }

    connectedCallback() {
        const n = domUtils.htmlToElement(template);
        this.addEventListener("click", this.listeners['click']);
        this.appendChild(n);
    }

    disconnectedCallback() {
        this.removeEventListener("click", this.listeners['click']);
    }

    onClick (evt) {
        evt.preventDefault();
        evt.stopPropagation();
        return false;
    }


})