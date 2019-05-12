import domUtils from './../../../../utils/Dom';
import template from './home.html';

import './home.scss';

customElements.define('app-home', class extends HTMLElement {

    constructor() {
        super();
        this.listeners = {
            'toggleSidebar': this.toggleSidebar.bind(this),
        };
    }

    connectedCallback() {
        const n = domUtils.htmlToElement(template);

       // n.querySelector('#sidebarCollapse').addEventListener("click", this.listeners['toggleSidebar']);

        n.querySelector('#collapse-icon').classList.add('fa-angle-double-left'); 

        // Collapse click
        n.querySelector('[data-toggle=sidebar-collapse]').addEventListener('click',  this.listeners['toggleSidebar']);

        this.appendChild(n);
    }

    toggleSidebar() {
        this.querySelectorAll('.menu-collapsed').forEach( e => e.classList.toggle('d-none'));
        this.querySelectorAll('.sidebar-submenu').forEach( e => e.classList.toggle('d-none'));
        this.querySelectorAll('.submenu-icon').forEach( e => e.classList.toggle('d-none'));
        const sc = this.querySelector('#sidebar-container').classList;
        sc.toggle('sidebar-expanded');
        sc.toggle('sidebar-collapsed');
        
        // Treating d-flex/d-none on separators with title
        this.querySelectorAll('.sidebar-separator-title').forEach( e => e.classList.toggle('d-flex'));
        // Collapse/Expand icon
        const ci = this.querySelector('#collapse-icon').classList;
        ci.toggle('fa-angle-double-left');
        ci.toggle('fa-angle-double-right')
    }

})