import domUtils from '../../../../utils/Dom'
import i18nService from '../../../../services/I18nService'
import sortViewService from '../../../common/services/SortViewService'
import confirmService from '../../../common/components/confirm-dialog/ConfirmService'
import notificationService from '../../../../components/notification/NotificationService'
import docService from './DocumentService'
import loaderService from '../../../../components/loader/LoaderService';

import tmplMain from './main.html'
import tmplListItem from './ListItem.html.js'
import i18next from 'i18next';

customElements.define('app-documents', class extends HTMLElement {

	constructor() {
		super();
		this.data = {};
		this.state = {
			sort: {}
		};
		this.listeners = {
			createDoc: this.createDoc.bind(this),
			sort: this.sort.bind(this),
			editDoc: this.editDoc.bind(this),
			deleteDoc: this.deleteDoc.bind(this),
			downloadDoc: this.downloadDoc.bind(this),
			loadData: this.loadData.bind(this, true)
		};
	}

	connectedCallback() {
		const n = domUtils.htmlToElement(tmplMain);
		i18nService.localize(n);
		this.className = "container";
		this.appendChild(n);
		this.loadData();
		n.querySelector("#btnCreateDoc").addEventListener('click', this.listeners.createDoc);
		n.querySelectorAll("th[data-target]").forEach( n => n.addEventListener('click', this.listeners.sort));
		import ('./DocDetail');
		docService.subscribe(docService.EVENTS.DOC_SAVED, this.listeners.loadData);
	}

	disconnectedCallback() {
		this.clearListEvents();
		this.querySelectorAll('th[data-target]').forEach( n => n.removeEventListener('click', this.listeners.sort));
		this.querySelector("#btnCreateDoc").addEventListener('click', this.listeners.createDoc);
	}

	loadData(loading = true) {
		console.log("loading Doc lista data...");
		loading && loaderService.show('list-container');
		return docService.getList()
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
			data.forEach( (Doc) => {
				const row = domUtils.htmlToElement(tmplListItem(Doc));
				df.appendChild(row);
			})
			const lc = this.querySelector('#list-container');
			lc.appendChild(df);
			lc.querySelectorAll('tbody button[data-action]')
				.forEach( n => n.addEventListener('click', this.listeners[`${n.dataset.action}Doc`]))
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

	createDoc(evt) {
		const detail = domUtils.htmlToElement('<app-doc-detail data-id=""></app-doc-detail>');
		document.body.appendChild(detail);
	}

	sort(evt) {
		evt.preventDefault();
		evt.stopPropagation();
		const field = evt.target.dataset.target;
		sortViewService.toggleSortDirection(this.state.sort, field);
		this.renderList(sortViewService.sort({field, direction: this.state.sort[field]}, docService.data));
		sortViewService.updateListHeaders(this.querySelectorAll("th[data-target]"), {field, direction: this.state.sort[field]});
	}

	deleteDoc(evt) {
		evt.preventDefault();
		evt.stopPropagation();
		const id = evt.currentTarget.dataset.id;
		const Doc = docService.getDetails(id);
		confirmService.show(i18next.t('docs.confirmDeleteDoc', {title: doc.title}),
			(result) => {
				if(result) {
					loaderService.show('list-container');
					docService.delete(id)
						.then((result) => {
							if(result) {
								notificationService.show(
									{
										title: i18next.t("docs.listTitle"), 
										message: i18next.t("common.confirmDeleteSuccess")
									}, notificationService.STYLE.SUCCESS);
								return this.loadData()
							} else {
								notificationService.show(
									{
										title: i18next.t("docs.listTitle"), 
										message: i18next.t("common.confirmDeleteError")
									}, notificationService.STYLE.ERROR);
							}
						})
						.catch((error) => {
							notificationService.show(
								{
									title: i18next.t("docs.listTitle"), 
									message: i18next.t("common.confirmDeleteError")
								}, notificationService.STYLE.ERROR);
						})						
						.finally( () => loaderService.hide('list-container'));
				}
			})
	}

	editDoc(evt) {
		evt.preventDefault();
		evt.stopPropagation();
		console.log('edit Doc '+evt.currentTarget.dataset.id);
		const detail = domUtils.htmlToElement('<app-doc-detail data-id="'+evt.currentTarget.dataset.id+'"></app-doc-detail>');
		document.body.appendChild(detail);
	}

	downloadDoc(evt) {
		evt.preventDefault();
		evt.stopPropagation();
		console.log('download Doc '+evt.currentTarget.dataset.id);
	}

});