import domUtils from '../../../../utils/Dom'
import i18nService from './../../../../services/I18nService'
import sortViewService from './../../../common/services/SortViewService'
import confirmService from './../../../common/components/confirm-dialog/ConfirmService'
import notificationService from './../../../../components/notification/NotificationService'
import userService from './UserService'
import loaderService from './../../../../components/loader/LoaderService';

import tmplMain from './main.html'
import tmplListItem from './ListItem.html.js'
import i18next from 'i18next';

customElements.define('app-users', class extends HTMLElement {

	constructor() {
		super();
		this.data = {};
		this.state = {
			sort: {}
		};
		this.listeners = {
			createUser: this.createUser.bind(this),
			sort: this.sort.bind(this),
			editUser: this.editUser.bind(this),
			deleteUser: this.deleteUser.bind(this),
			loadData: this.loadData.bind(this, true)
		};
	}

	connectedCallback() {
		const n = domUtils.htmlToElement(tmplMain);
		i18nService.localize(n);
		this.className = "container";
		this.appendChild(n);
		this.loadData();
		n.querySelector("#btnCreateUser").addEventListener('click', this.listeners.createUser);
		n.querySelectorAll("th[data-target]").forEach( n => n.addEventListener('click', this.listeners.sort));
		import ('./UserDetail');
		userService.subscribe(userService.EVENTS.USER_SAVED, this.listeners.loadData);
	}

	disconnectedCallback() {
		this.clearListEvents();
		this.querySelectorAll('th[data-target]').forEach( n => n.removeEventListener('click', this.listeners.sort));
		this.querySelector("#btnCreateUser").addEventListener('click', this.listeners.createUser);
		notificationService.unsubscribe(userService.EVENTS.USER_SAVED, this.showMessage);
	}

	loadData(loading = true) {
		console.log("loading user lista data...");
		loading && loaderService.show('list-container');
		return userService.getList()
			.then(data => this.renderList(data))
			.finally( () => loading && loaderService.hide('list-container'));
	}

	renderList(data) {
		this.clearListData();
		if (!data || !data.length) {
			const c = document.createElement('app-list-empty');
			this.querySelector('#list-container').appendChild(c);
		} else {
			const df = document.createDocumentFragment();
			data.forEach( (user) => {
				const row = domUtils.htmlToElement(tmplListItem(user));
				row.addEventListener('click', this.listeners.selectUser);
				df.appendChild(row);
			})
			const lc = this.querySelector('#list-container');
			lc.appendChild(df);
			lc.querySelectorAll('tbody button[data-action]')
				.forEach( n => n.addEventListener('click', this.listeners[`${n.dataset.action}User`]))
		}

	}

	clearListData() {
		this.clearListEvents();
		this.querySelector('#list-container').innerHTML = '';
	}

	clearListEvents() {
		this.querySelectorAll('tbody button[data-action]')
			.forEach( n => n.removeEventListener('click', this.listeners.listItemHandler))
	}

	createUser(evt) {
		const detail = domUtils.htmlToElement('<app-user-detail id=""></app-user-detail>');
		document.body.appendChild(detail);
	}

	sort(evt) {
		evt.preventDefault();
		evt.stopPropagation();
		const field = evt.target.dataset.target;
		sortViewService.toggleSortDirection(this.state.sort, field);
		this.renderList(sortViewService.sort({field, direction: this.state.sort[field]}, userService.data));
		sortViewService.updateListHeaders(this.querySelectorAll("th[data-target]"), {field, direction: this.state.sort[field]});
	}

	deleteUser(evt) {
		evt.preventDefault();
		evt.stopPropagation();
		const id = evt.currentTarget.dataset.id;
		const user = userService.getDetails(id);
		confirmService.show(i18next.t('user.confirmDeleteUser', {fullname: user.name+' '+user.surname}),
			(result) => {
				if(result) {
					loaderService.show('list-container');
					userService.delete(id)
						.then(() => {
							notificationService.show(
								{
									title: i18next.t("usersList"), 
									message: i18next.t("user.confirmDeleteUserSuccess", {fullname: user.name+' '+user.surname})
								}, notificationService.STYLE.SUCCESS);
							return this.loadData()
						})
						.catch((error) => {
							notificationService.show(
								{
									title: i18next.t("usersList"), 
									message: i18next.t("user.confirmDeleteUserError", {fullname: user.name+' '+user.surname})
								}, notificationService.STYLE.ERROR);
						})						
						.finally( () => loaderService.hide('list-container'));
				}
			})

		console.log('delete user '+user.name + ' -' +id);
	}

	editUser(evt) {
		evt.preventDefault();
		evt.stopPropagation();
		console.log('edit user '+evt.currentTarget.dataset.id);
		const detail = domUtils.htmlToElement('<app-user-detail id="'+evt.currentTarget.dataset.id+'"></app-user-detail>');
		document.body.appendChild(detail);
	}

});