import domUtils from '../../utils/Dom';
import template from './notification.html.js';

import './_notification.scss';

customElements.define('app-notification', class extends HTMLElement {

	constructor() {
		super();
		this.message = '';
		this.onShow = this.show.bind(this)
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

	notifyMessage() {
		const tmpl = template(this.message);
        const n = domUtils.htmlToElement(tmpl);

		n.addEventListener('closed.bs.alert', () => {
			this.firstElementChild.parentNode.removeChild(this.firstElementChild)
		});

		this.appendChild(n);
	}

})
