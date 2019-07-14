import i18next from 'i18next'

import domUtils from '../../../../utils/Dom'
import serviceUtils from '../../../../utils/Service'
import i18nService from '../../../../services/I18nService'

import tmplDetails from './DocDetail.html.js'
import docService from './DocumentService';
import notificationService from '../../../../components/notification/NotificationService';

customElements.define('app-doc-detail', class extends HTMLElement {

    constructor() {
        super();
        this.listeners = {
            'save': this.save.bind(this),
            'cancel': this.cancel.bind(this)
        }
	}

	connectedCallback() {
        // load loader
        const id = this.dataset.id;
        if (id) {
            userService.getById(id)
                .then((item => this.loadData(item)))
                .catch( () => {
                    // TODO: notify error
                })
        } else {
            this.loadData({});
        }

    }

    clearEvents() {
        this.querySelector(".btn-save").removeEventListener("click",this.listeners.save);
        this.querySelector(".btn-cancel").removeEventListener("click", this.listeners.cancel);
    }
    
    loadData(item) {
		const n = domUtils.htmlToElement(tmplDetails(item));
		i18nService.localize(n);
        this.appendChild(n);
        $('.floating-label .custom-select, .floating-label .form-control').floatinglabel();
        //Trigger the modal
        $("#docDetailModal").modal({
            backdrop: 'static',
            keyboard: false
        });

        this.querySelector(".btn-save").addEventListener("click",this.listeners.save);
        this.querySelector(".btn-cancel").addEventListener("click", this.listeners.cancel);
        // TODO: add form keypress event: esc, submit
        
        $("#docDetailModal").on('hidden.bs.modal', () => {
            this.clearEvents();
            $("#docDetailModal").remove();
            this.parentNode.removeChild(this);
        });

    }

    save(evt) {
        const form = this.querySelector('#docDetailForm');
        domUtils.cleanFormValidation(form);
        notificationService.clearResult('docMessageContainer');
        
        evt.preventDefault();
        evt.stopPropagation();
        
        if (form.checkValidity()) {
            const data = new FormData(form);
            const d = serviceUtils.formDataToJson(data);
            docService.save(d)
                    .then(item => {
                        $("#docDetailModal").modal("hide");
                        notificationService.show(
                            {title: i18next.t("common.detailSave"), message: i18next.t("common.detailSaveSuccess")}, 
                            notificationService.STYLE.SUCCESS);
                    })
                    .catch(err => {
                        notificationService.showResult(
                            i18next.t('common.detailSaveError') + '-'+err.message,
                            notificationService.STYLE.ERROR,
                            'docMessageContainer'
                        );
                    });
    
        } else {
            domUtils.showInvalidFormMessage(form);
            form.classList.add('was-validated');
            console.log("Invalifd form");
        }
    }

    cancel(evt) {
        $("#docDetailModal").modal("hide");
    }
});