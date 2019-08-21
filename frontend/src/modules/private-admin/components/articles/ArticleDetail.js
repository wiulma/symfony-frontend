import AbstractDetailElement from '../../../common/components/AbstractDetailElement';
import tmplDetails from './ArticleDetail.html.js'
import articleService from './ArticleService';

customElements.define('app-article-detail', class extends AbstractDetailElement {

    constructor() {
        super();
        this.config = Object.assign({},
            this.config,
            {
                tmplDetails,
                containerId: 'articleDetailModal',
                messageContainerId: 'articleMessageContainer',
                formId: 'articleDetailForm'
            }
        );
    }

    connectedCallback() {
        this.loadData(articleService);
    }

    clearEvents() {
        this.querySelector(".btn-save").removeEventListener("click", this.listeners.save);
        this.querySelector(".btn-cancel").removeEventListener("click", this.listeners.cancel);
    }

    save(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this.saveData(articleService, {
            saveSuccessTitle: "articles.detailSaveTitle",
            saveSuccessMessage: "articles.detailSaveMessage"
        });
    }
});