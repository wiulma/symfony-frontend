import domUtils from '../../utils/Dom';
import template from './notification.html';

customElements.define('app-notification', class extends HTMLElement {

	constructor() {
		super();
		this.onShow = this.show.bind(this)
	}

	static get observedAttributes() {
		return [
			'message'
		]
	}

	get message() {
		if (!this.hasAttribute('message')) {
			return []
		}

		return JSON.parse(this.getAttribute('message'))
	}

	set message(value) {
		this.setAttribute('message', JSON.stringify(value))
	}

	connectedCallback() {
		document.addEventListener("showNotification", this.onShow)
	}

	disconnectedCallback() {
		document.removeEventListener("showNotification", this.onShow)
	}


	show(evt, data) {
		this.message = data;
	}

	attributeChangedCallback() {
		this.notifyMessage()
	}

	notifyMessage() {
		const {text, style} = this.message;
		const n = domUtils.htmlToElement(domUtils.bindData(template, this.message));

		n.addEventListener('closed.bs.alert', () => {
			this.firstElementChild.parentNode.removeChild(this.firstElementChild)
		});

		this.appendChild(n);
	}

})
