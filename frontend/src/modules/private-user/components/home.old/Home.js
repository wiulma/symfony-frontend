import domUtils from './../../../../utils/Dom';
import template from './home.html';
import routingService from '../../../../services/RoutingService';

import './home.scss';

customElements.define('app-home', class extends HTMLElement {

    constructor() {
        super();
        this.listeners = {
            "navigateToUsers": this.navigate.bind(this, "private/users"),
            "navigateToHome": this.navigate.bind(this, "private/dashboard"),
            "navigateToSensors": this.navigate.bind(this, "private/sensors")
        };
    }

    navigateTo(page) {
        return this.navigate.bind()
    }

    connectedCallback() {
        const n = domUtils.htmlToElement(template);

        n.querySelector('#link-users').addEventListener('click', this.listeners.navigateToUsers)
        n.querySelector('#link-home').addEventListener('click', this.listeners.navigateToHome)
        n.querySelector('#link-sensors').addEventListener('click', this.listeners.navigateToSensors)
        this.appendChild(n);
    }

    disconnectedCallback() {
        this.querySelector('#link-users').removeEventListener('click', this.listeners.navigateToUsers)
        this.querySelector('#link-home').removeEventListener('click', this.listeners.navigateToHome)
        this.querySelector('#link-sensors').removeEventListener('click', this.listeners.navigateToSensors)
    }

    navigate(page) {
        routingService.get().navigate(page);
    }


})