import domUtils from './../../../../utils/Dom';
import template from './Home.html.js';
import routingService from '../../../../services/RoutingService'
import userAuthService from '../../services/UserAuthService'
import i18nService from './../../../../services/I18nService';

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
        const tmpl = template(userAuthService.profile);
        const n = domUtils.htmlToElement(tmpl);
        i18nService.localize(n);
        n.querySelector('#mnuChangePwd').addEventListener('click', this.listeners.changePassword)
        n.querySelector('#mnuLogout').addEventListener('click', this.listeners.logout)
        this.appendChild(n);
    }

    changePassword() {
        alert('change password');
    }

    logout() {
        userAuthService.logout()
            .then(routingService.logout.bind(routingService));
    }

})