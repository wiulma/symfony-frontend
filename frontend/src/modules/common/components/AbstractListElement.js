import i18next from 'i18next';

import notificationService from '../../../components/notification/NotificationService';
import loaderService from '../../../components/loader/LoaderService';
import confirmService from '../components/confirm-dialog/ConfirmService'
import domUtils from './../../../utils/Dom';

/**
 * Abstract list component
 */
export default class AbstractListElement extends HTMLElement {

    constructor() {
        super();
        this.configs = {
            tmplListItem: () => {}
        };

        this.listeners = {
            sort: () => {},
            showCreate: this.showCreate.bind(this),
            edit: this.showCreate.bind(this),
            delete: this.delete.bind(this)
        };

        // suffix used in order to define action functions
        this.suffix = '';

    }

    initPageEvents() {
        this.querySelectorAll("th[data-target]").forEach( n => n.addEventListener('click', this.listeners.sort));
        this.querySelector('#btnCreate').addEventListener('click', this.listeners.showCreate);
    }

    clearListData() {
		this.clearListEvents();
		this.querySelector('#list-container').innerHTML = '';
	}

	clearListEvents() {
        this.querySelectorAll("th[data-target]").forEach( n => n.removeEventListener('click', this.listeners.sort));
		this.querySelectorAll('tbody button[data-action]')
			.forEach( n => n.removeEventListener('click', this.listeners[`${n.dataset.action}${this.suffix}`]))
    }

    clearPageEvents() {
        this.clearListEvents();
        this.querySelector('#btnCreate').removeEventListener('click', this.listeners.showCreate);
    }

    loadData(dataService, loading = true) {
		console.log("loading list data...");
		loading && loaderService.show('list-container');
		return dataService.getList()
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
			data.forEach( (elm) => {
				const row = domUtils.htmlToElement(this.configs.tmplListItem(elm));
				df.appendChild(row);
			})
			const lc = this.querySelector('#list-container');
			lc.appendChild(df);
			lc.querySelectorAll('tbody button[data-action]')
				.forEach( n => n.addEventListener('click', this.listeners[`${n.dataset.action}${this.suffix}`]))
		}

    }


    /**
     * show create item nutton click callback
     * @param {dom click event} evt 
     */
    showCreate(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        if (this.configs.tmplDetail) {
            const id = evt.currentTarget.dataset.id || "";
            const detail = domUtils.htmlToElement(this.configs.tmplDetail.replace('{{id}}', id));
            document.body.appendChild(detail);
        } else return false;
    }

    // TODO
    doDelete(evt, configs) {
        evt.stopPropagation();
        evt.preventDefault();
        const {
                id, details, service, 
                confirm: {title: confirmTitle}, 
                notification: {title: notificationTitle, 
                    successMessage = i18next.t("common.confirmDeleteSuccess"),
                    failureMessage = i18next.t("common.confirmDeleteError")
                }
            } = configs;

            confirmService.show(confirmTitle,
                (result) => {
                    if(result) {
                        loaderService.show('list-container');
                        service.delete(id)
                            .then((result) => {
                                if(result) {
                                    notificationService.show(
                                        {
                                            title: notificationTitle, 
                                            message: successMessage
                                        }, notificationService.STYLE.SUCCESS);
                                    return this.loadData(service)
                                } else {
                                    notificationService.show(
                                        {
                                            title: notificationTitle, 
                                            message: failureMessage
                                        }, notificationService.STYLE.ERROR);
                                }
                            })
                            .catch((error) => {
                                notificationService.show(
                                    {
                                        title: notificationTitle, 
                                        message: failureMessage
                                    }, notificationService.STYLE.ERROR);
                            })						
                            .finally( () => loaderService.hide('list-container'));
                    }
                });
    }

}