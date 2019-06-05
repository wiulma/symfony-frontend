import domUtils from './../../../../utils/Dom';
import template from './home.html.js';
import template2 from './home.html';
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
        performance.mark("template-0");
        const str = domUtils.bind(template2, {user: userAuthService.profile});
        const n1 = domUtils.htmlToElement(str);
        performance.mark("template-1");
        const tmpl = template(userAuthService.profile);
        const n = domUtils.htmlToElement(tmpl);
        performance.mark("template-2");

        performance.measure("template 1", "template-0", "template-1");

        performance.measure("template 2", "template-1", "template-2");
        console.log(performance.getEntriesByType("measure"));
        performance.clearMarks();
        performance.clearMeasures();

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