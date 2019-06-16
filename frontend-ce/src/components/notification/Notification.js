import domUtils from '../../utils/Dom';
import Const from '../../const';

import template from './notification.html.js';

import './notification.scss';

customElements.define('app-notification', class extends HTMLElement {

	constructor() {
		super();
		this.message = '';
		this.onShow = this.show.bind(this)
		this.onHideMessage = this.hideMessage.bind(this);
	}

	connectedCallback() {
		document.addEventListener("showNotification", this.onShow)
	}

	disconnectedCallback() {
		document.removeEventListener("showNotification", this.onShow)
	}

	show(evt) {
		this.message = evt.detail;
		(this.message != '') && this.notifyMessage()
	}

	hideMessage(){
		this.firstElementChild.parentNode.removeChild(this.firstElementChild);
	}

	notifyMessage() {
        const n = domUtils.htmlToElement(template(this.message));

		n.addEventListener('closed.bs.alert', this.onHideMessage);

		window.requestAnimationFrame(() => {
			this.appendChild(n);
			setTimeout(() => {
				n.removeEventListener('closed.bs.alert', this.onHideMessage);
				n.parentNode.removeChild(n);	
			}, Const.NOTIFICATION_SHOW)
		})

		
	}

})
