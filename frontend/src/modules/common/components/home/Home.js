import domUtils from './../../../../utils/Dom';
import template from './home.html';
import routingService from '../../../../services/RoutingService'
import userService from '../../services/UserService'

import './home.scss';

customElements.define('app-home', class extends HTMLElement {

    constructor() {
        super();
        this.listeners = {
            changePassword: this.changePassword.bind(this),
            logout: this.logout.bind(this)
        }
    }

    connectedCallback() {
        const n = domUtils.htmlToElement(template);

        n.querySelector('#menuChangePwd').addEventListener('click', this.listeners.changePassword)
        n.querySelector('#menuLogout').addEventListener('click', this.listeners.logout)
        this.appendChild(n);
    }

    changePassword() {
        alert('change password');
    }

    logout() {
        userService.logout()
            .then(routingService.logout.bind(routingService));
    }

})