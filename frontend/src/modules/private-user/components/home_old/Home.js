import template from './home.html'
import routingService from '../../../../services/RoutingService'

import './home.scss'

customElements.define('app-home', class extends HTMLElement {

    constructor() {
        super();
        this.listeners = {
            linkDashboard: routingService.get().navigate("private/dashboard").bind(routingService),
            linkSettings: routingService.get().navigate("private/settings").bind(routingService)
        }
    }


    connectedCallback() {
        const n = domUtils.htmlToElement(template);
        n.querySelector('#linkDashboard').addEventListener('click', this.listeners.linkDashboard);
        n.querySelector('#linkSettings').addEventListener('click', this.listeners.linkSettings);
        this.appendChild(n);
    }

    disconnectedCallback() {
        this.querySelector('#linkDashboard').removeEventListener('click', this.listeners.linkDashboard)
        this.querySelector('#linkSettings').removeEventListener('click', this.listeners.linkSettings)
    }


})