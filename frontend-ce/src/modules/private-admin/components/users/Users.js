import domUtils from '../../../../utils/Dom'
import i18nService from './../../../../services/I18nService'
import UserService from './UserService'
import loaderService from './../../../../components/loader/LoaderService';

import tmplMain from './main.html'
import tmplListItem from './ListItem.html.js'

customElements.define('app-users', class extends HTMLElement {

	constructor() {
		super();
		this.listeners = {
			createUser: this.createUser.bind(this),
			selectUser: this.selectUser.bind(this)
		};
	}

	connectedCallback() {
		const n = domUtils.htmlToElement(tmplMain);
		i18nService.localize(n);
		this.className = "container";
		this.appendChild(n);
		this.loadData();
	}

	loadData() {
		loaderService.show('list-container');
		UserService.getList()
			.then(data => this.renderList(data))
			.finally( () => loaderService.hide('list-container'));
	}

	renderList(resp) {
		
		if (!resp.data || !resp.data.length) {
			const c = document.createElement('app-list-empty');
			this.querySelector('#list-container').appendChild(c);
		} else {
			const df = document.createDocumentFragment();
			resp.data.forEach( (user) => {
				const row = domUtils.htmlToElement(tmplListItem(user));
				row.addEventListener('click', this.listeners.selectUser);
				df.appendChild(row);
			})
			this.querySelector('#list-container').appendChild(df);
		}

	}

	clearList() {
		debugger;
		this.querySelector('.row data')
			.forEach( r => r.removeEventListener('click', this.listeners.selectUser))
	}

	createUser() {
		alert('create user');
	}

	selectUser(evt) {
		const ds = evt.target.dataset;
		switch (ds.action) {
			case 'delete':
				this.deleteUser(ds.id);
				break;
			case 'edit':
				this.editUser(ds.id);
				break;
		}
	}

	deleteUser(id) {
		const user = UserService.getDetails(id)
		alert('delete user '+user.name + ' -' +id);
	}

	editUser(id) {
		alert('edit user '+eid);
	}

});