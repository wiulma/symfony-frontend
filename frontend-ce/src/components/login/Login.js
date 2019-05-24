import './login.scss';

import domUtils from '../../utils/Dom';
import template from './login.html';
import loginService from '../../services/LoginService';
import routingService from '../../services/RoutingService';
import i18nService from '../../services/I18nService';
import notificationService from '../notification/NotificationService';

customElements.define('app-login', class extends HTMLElement {

  constructor() {
    super();
    this.listeners = {
      'btnLogin': this.doLogin.bind(this)
    };    
  }

  connectedCallback() {
    const n = domUtils.htmlToElement(template);
    n.querySelector('.login').addEventListener("click", this.listeners['btnLogin']);
    i18nService.localize(n);
    this.appendChild(n);
  }

  disconnectedCallback() {
    const btnLogin = this.querySelector('.login')
    btnLogin.removeEventListener("click", this.listeners['btnLogin']);
  }

  doLogin (evt) {
    evt.preventDefault();
    loginService.doLogin(new FormData(this.querySelector('#loginForm')))
      .then( (data) => {
        routingService.get().navigate("private");
      })
      .catch((err) => {
        notificationService.show("Login failed", notificationService.STYLE.ERROR);
      });
  }


});