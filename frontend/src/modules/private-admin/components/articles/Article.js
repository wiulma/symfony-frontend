import i18next from 'i18next';

import AbstractListElement from '../../../common/components/AbstractListElement';
import domUtils from '../../../../utils/Dom'
import i18nService from '../../../../services/I18nService'
import articleService from './ArticleService'

import tmplListItem from './ListItem.html.js'
import template from './main.html'

customElements.define('app-articles', class extends AbstractListElement {

    constructor() {
        super();
        this.listeners = Object.assign({},
            this.listeners,
            {
                loadData: this.loadData.bind(this, articleService)
            }
        );
        this.configs = Object.assign({},
            this.configs,
            {
                tmplDetail : '<app-article-detail data-id="{{id}}"></app-article-detail>',
                tmplListItem: tmplListItem
            }
        );
        this.suffix = '';
    }

    connectedCallback() {
        const n = domUtils.htmlToElement(template);
        i18nService.localize(n);
		this.className = "container";
        this.appendChild(n);
        this.loadData(articleService);
        this.initPageEvents();
        import ('./ArticleDetail');
        articleService.subscribe(articleService.EVENTS.SAVED, this.listeners.loadData);
    }

    disconnectedCallback() {
        this.clearPageEvents();
    }

    delete(evt) {
        // {id, details, service, confirm: {title}, notification: {title, successMessage, failureMessage}}
        const id = evt.currentTarget.dataset.id;
		const details = articleService.getDetails(id);
        const configs = {
            id,
            details,
            service: articleService,
            confirm: {
                title: i18next.t('articles.confirmDelete', {code: details.code})
            },
            notification: {
                title: i18next.t("articles.listTitle"), 
                successMessage: i18next.t("articles.confirmDeleteSuccess",  {code: details.code}),
                failureMessage: i18next.t("common.confirmDeleteError")
            }
        }
        super.doDelete(evt, configs);
    }
   
});